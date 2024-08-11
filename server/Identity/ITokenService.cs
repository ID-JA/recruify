using FastRecruiter.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FastRecruiter.Api.Identity;

public record TokenResponse(string Token, string RefreshToken, DateTime RefreshTokenExpiryTime);

public record TokenGenerationCommand(string Email, string Password, bool IsExternalLogin = false);

public record RefreshTokenCommand(string Token, string RefreshToken);

public interface ITokenService
{
    Task<TokenResponse> GenerateTokenAsync(TokenGenerationCommand request, CancellationToken cancellationToken);
    Task<TokenResponse> RefreshTokenAsync(RefreshTokenCommand request, CancellationToken cancellationToken);
}

public class TokenService : ITokenService
{
    private readonly UserManager<User> userManager;
    private readonly JwtOptions jwtOptions;

    public TokenService(UserManager<User> userManager, IOptions<JwtOptions> jwtOptions)
    {
        this.userManager = userManager;
        this.jwtOptions = jwtOptions.Value;
    }

    public async Task<TokenResponse> GenerateTokenAsync(TokenGenerationCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email.Trim().Normalize()) ?? throw new UnauthorizedAccessException();

        if (!request.IsExternalLogin && !await userManager.CheckPasswordAsync(user, request.Password))
        {
            throw new UnauthorizedAccessException();
        }

        return await GenerateTokensAndUpdateUser(user);
    }


    public async Task<TokenResponse> RefreshTokenAsync(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var userPrincipal = GetPrincipalFromExpiredToken(request.Token);
        var userId = userManager.GetUserId(userPrincipal)!;
        var user = await userManager.FindByIdAsync(userId);
        if (user is null)
        {
            throw new UnauthorizedAccessException();
        }

        if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            throw new UnauthorizedAccessException("Invalid Refresh Token");
        }

        return await GenerateTokensAndUpdateUser(user);
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
            new(ClaimTypes.Name, user.FirstName ?? string.Empty),
            new(ClaimTypes.Surname, user.LastName ?? string.Empty),
        };

        var token = new JwtSecurityToken(
           claims: claims,
           expires: DateTime.UtcNow.AddMinutes(jwtOptions.TokenExpirationInMinutes),
           signingCredentials: signingCredentials,
           issuer: "http://localhost:3000",
           audience: "fastrecruiter"
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

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Key)),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = "http://localhost:3000",
            ValidIssuer = "fastrecruiter",
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
            throw new UnauthorizedAccessException("invalid token");
        }

        return principal;
    }
}
