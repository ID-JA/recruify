using FastRecruiter.Api.Auth.Jwt;
using FastRecruiter.Api.Exceptions;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Identity.Users.Features.UserInfo;
using FastRecruiter.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FastRecruiter.Api.Identity.Tokens;

public record TokenResponse(string Token, string RefreshToken, DateTime RefreshTokenExpiryTime);

public record TokenGenerationCommand(string Email, string Password, bool IsExternalLogin = false);

public record RefreshTokenCommand(string Token, string RefreshToken);

public interface ITokenService
{
    Task<TokenResponse> GenerateTokenAsync(TokenGenerationCommand request, CancellationToken cancellationToken);
    Task<TokenResponse> RefreshTokenAsync(RefreshTokenCommand request, CancellationToken cancellationToken);
    void SetTokenInCookie(TokenResponse tokens, HttpContext httpContext);
    public UserDto? ValidateToken(HttpContext httpContext);

}

public class TokenService(UserManager<User> userManager, IOptions<JwtOptions> jwtOptions) : ITokenService
{
    private readonly UserManager<User> userManager = userManager;
    private readonly JwtOptions jwtOptions = jwtOptions.Value;

    public async Task<TokenResponse> GenerateTokenAsync(TokenGenerationCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email.Trim().Normalize()) ?? throw new UnauthorizedException();

        if (!request.IsExternalLogin && !await userManager.CheckPasswordAsync(user, request.Password))
        {
            throw new UnauthorizedException();
        }

        return await GenerateTokensAndUpdateUser(user);
    }


    public async Task<TokenResponse> RefreshTokenAsync(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var userPrincipal = GetPrincipalFromToken(request.Token);
        var userId = userManager.GetUserId(userPrincipal)!;
        var user = await userManager.FindByIdAsync(userId) ?? throw new UnauthorizedException();

        if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            throw new UnauthorizedException("Invalid Refresh Token");
        }

        return await GenerateTokensAndUpdateUser(user);
    }

    public void SetTokenInCookie(TokenResponse tokens, HttpContext httpContext)
    {
        httpContext.Response.Cookies.Append("access_token", tokens.Token, new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddMinutes(jwtOptions.TokenExpirationInMinutes),
            SameSite = SameSiteMode.None,
            IsEssential = true,
            Secure = true,
        });

        httpContext.Response.Cookies.Append("refresh_token", tokens.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(jwtOptions.RefreshTokenExpirationInDays),
            SameSite = SameSiteMode.None,
            IsEssential = true,
            Secure = true,
        });
    }

    public UserDto? ValidateToken(HttpContext httpContext)
    {
        httpContext.Request.Cookies.TryGetValue("access_token", out var accessToken);
        if (accessToken == null)
            return null;

        var userPrincipal = GetPrincipalFromToken(accessToken);


        var companyId = userPrincipal.FindFirstValue("companyId");
        var user = new UserDto
        {
            Id = Guid.Parse(userPrincipal.FindFirstValue(ClaimTypes.NameIdentifier)!),
            Email = userPrincipal.FindFirstValue(ClaimTypes.Email)!,
            FirstName = userPrincipal.FindFirstValue(ClaimTypes.Name)!,
            LastName = userPrincipal.FindFirstValue(ClaimTypes.Surname)!,
            Role = userPrincipal.FindFirstValue(ClaimTypes.Role)!,
            ImageUrl = userPrincipal.FindFirstValue("imageUrl"),
            CompanyId = string.IsNullOrEmpty(companyId) ? null : Guid.Parse(companyId),
            RefreshToken = userPrincipal.FindFirstValue("refreshToken"),
            CreatedAt = DateTime.Parse(userPrincipal.FindFirstValue("createdAt")!)
        };

        return user;
    }

    private async Task<TokenResponse> GenerateTokensAndUpdateUser(User user)
    {
        byte[] secret = Encoding.UTF8.GetBytes(jwtOptions.Key);

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(secret),
            SecurityAlgorithms.HmacSha256
        );

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.Name, user.FirstName),
            new(ClaimTypes.Surname, user.LastName),
            new(ClaimTypes.Role, user.Role),
            new("imageUrl", user.ImageUrl ?? string.Empty),
            new("companyId", user.CompanyId.ToString() ?? string.Empty),
            new("refreshToken", user.RefreshToken ?? string.Empty),
            new("createdAt", user.CreatedAt.ToString()),
        };

        var token = new JwtSecurityToken(
           claims: claims,
           expires: DateTime.UtcNow.AddMinutes(jwtOptions.TokenExpirationInMinutes),
           signingCredentials: signingCredentials,
           issuer: "http://localhost:3000",
           audience: "http://localhost:3000"
        );

        var tokenHandler = new JwtSecurityTokenHandler();

        string tokenValue = tokenHandler.WriteToken(token);

        byte[] randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);

        user.RefreshToken = Convert.ToBase64String(randomNumber);
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(jwtOptions.RefreshTokenExpirationInDays);

        await userManager.UpdateAsync(user);

        return new TokenResponse(tokenValue, user.RefreshToken, user.RefreshTokenExpiryTime);
    }

    private ClaimsPrincipal GetPrincipalFromToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Key)),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = "http://localhost:3000",
            ValidIssuer = "http://localhost:3000",
            RoleClaimType = ClaimTypes.Role,
            ClockSkew = TimeSpan.Zero,
            ValidateLifetime = false
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var principal = tokenHandler.ValidateToken(
            token,
            tokenValidationParameters,
            out var securityToken
        );

        if (securityToken is not JwtSecurityToken jwtSecurityToken ||
            !jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha256,
                StringComparison.OrdinalIgnoreCase))
        {
            throw new UnauthorizedException("invalid token");
        }

        return principal;
    }
}
