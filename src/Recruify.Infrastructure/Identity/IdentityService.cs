using ErrorOr;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Recruify.Application.Common.Interfaces;
using Recruify.Application.Identity.Dtos;
using Recruify.Infrastructure.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Recruify.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly JwtOptions _jwtOptions;
    private readonly SigningCredentials _signingCredentials;
    private readonly UserManager<ApplicationUser> userManager;

    public IdentityService(UserManager<ApplicationUser> _userManager, RoleManager<IdentityRole<Guid>> _roleManager, IOptions<JwtOptions> jwtOptions)
    {
        userManager = _userManager;
        _jwtOptions = jwtOptions.Value;

        byte[] secret = Encoding.UTF8.GetBytes(_jwtOptions.Key);
        var securityKey = new SymmetricSecurityKey(secret);
        _signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
    }

    public async Task<ErrorOr<string>> CreateUserAsync(string firstName, string lastName, string email, string password)
    {
        var user = new ApplicationUser
        {
            FirstName = firstName,
            LastName = lastName,
            UserName = email,
            Email = email
        };

        var result = await userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            return user.Id.ToString();
        }

        return Error.Failure(description: result.Errors.First().Description);
    }

    public async Task<ErrorOr<string>> GetUserNameAsync(string userId)
    {
        var user = await userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        return user.UserName!;
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = await userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return false;
        }

        return await userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        // This is a placeholder. Implement your authorization logic here.
        return await Task.FromResult(true);
    }

    public async Task<ErrorOr<string>> GetUserIdAsync(string email)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        return user.Id.ToString();
    }

    public async Task<ErrorOr<Success>> DeleteUserAsync(string userId)
    {
        var user = await userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        var result = await userManager.DeleteAsync(user);

        if (result.Succeeded)
        {
            return Result.Success;
        }

        return Error.Failure(description: result.Errors.First().Description);
    }

    public async Task<ErrorOr<Success>> ConfirmEmail(string userId, string confirmationToken)
    {
        var user = await userManager.FindByIdAsync(userId);

        if (user is null)
        {
            return Error.NotFound(description: "User not found");
        }

        var result = await userManager.ConfirmEmailAsync(user, confirmationToken);

        return result.Succeeded ? Result.Success : Error.Failure(description: "Account Confirmation Failed");
    }

    public async Task<ErrorOr<Success>> AssignRoleAsync(string userId, string role)
    {
        var user = await userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        var isInRole = await userManager.IsInRoleAsync(user, role);
        if (isInRole)
        {
            return Error.Conflict(description: $"User is already in role '{role}'.");
        }

        var result = await userManager.AddToRoleAsync(user, role);
        if (result.Succeeded)
        {
            return Result.Success;
        }

        return Error.Failure(description: $"Failed to assign role: {result.Errors.First().Description}");
    }

    public async Task<ErrorOr<string>> GenerateEmailConfirmationTokenAsync(string userId)
    {
        var user = await userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
        return token;
    }

    public async Task<ErrorOr<bool>> SignIn(string email, string password, HttpContext httpContext)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return Error.Unauthorized(description: "Email or Password is incorrect");
        }

        var isCorrectPassword = await userManager.CheckPasswordAsync(user, password);

        if (isCorrectPassword)
        {
            var tokens = await GenerateTokensAndUpdateUser(user);
            SetTokenInCookie(tokens, httpContext);
            return true;
        }

        return Error.Unauthorized(description: "Email or Password is incorrect");
    }



    private void SetTokenInCookie(TokenResponse tokens, HttpContext httpContext)
    {
        httpContext.Response.Cookies.Append("access-token", tokens.Token, new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.TokenExpirationInMinutes),
            SameSite = SameSiteMode.None,
            IsEssential = true,
            Secure = true,
        });

        httpContext.Response.Cookies.Append("refresh-token", tokens.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationInDays),
            SameSite = SameSiteMode.None,
            IsEssential = true,
            Secure = true,
        });
    }


    private async Task<TokenResponse> GenerateTokensAndUpdateUser(ApplicationUser user)
    {
        var claims = new[]
        {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email!),
        new Claim("firstName", user.FirstName),
        new Claim("lastName", user.LastName),
    };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = _jwtOptions.Issuer,
            Audience = _jwtOptions.Audience,
            Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.TokenExpirationInMinutes),
            SigningCredentials = _signingCredentials,
            Subject = new ClaimsIdentity(claims)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenValue = tokenHandler.WriteToken(token);

        // Generate refresh token and expiry
        user.RefreshToken = Guid.NewGuid().ToString("N");
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationInDays);

        await userManager.UpdateAsync(user);

        return new TokenResponse(tokenValue, user.RefreshToken, user.RefreshTokenExpiryTime);
    }

    private ErrorOr<ClaimsPrincipal> GetPrincipalFromToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key)),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = _jwtOptions.Audience,
            ValidIssuer = _jwtOptions.Issuer,
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
            return Error.Validation(description: "invalid token");
        }

        return principal;
    }
}