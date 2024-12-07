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
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Recruify.Domain.Common;
using Recruify.Domain.Recruiters;
using Recruify.Domain.Recruiters.Specifications;
using Recruify.Infrastructure.Data;

namespace Recruify.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly JwtOptions _jwtOptions;
    private readonly SigningCredentials _signingCredentials;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IRepository<Recruiter> _recruiterRepository;
    private readonly RecruifyDbContext _dbContext;
    private readonly IMapper _mapper;
    public IdentityService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<Guid>> _roleManager, IOptions<JwtOptions> jwtOptions, SignInManager<ApplicationUser> signInManager, IRepository<Recruiter> recruiterRepository, RecruifyDbContext dbContext, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _recruiterRepository = recruiterRepository;
        _dbContext = dbContext;
        _mapper = mapper;
        _jwtOptions = jwtOptions.Value;

        var secret = Encoding.UTF8.GetBytes(_jwtOptions.Key);
        var securityKey = new SymmetricSecurityKey(secret);
        _signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
    }

    public async Task<ErrorOr<Guid>> CreateUserAsync(string firstName, string lastName, string email, string password)
    {
        var user = new ApplicationUser
        {
            FirstName = firstName,
            LastName = lastName,
            UserName = email,
            Email = email,
            RefreshToken = string.Empty
        };

        var result = await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            return user.Id;
        }

        return Error.Failure(description: result.Errors.First().Description);
    }

    public async Task<ErrorOr<string>> GetUserNameAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        return user.UserName!;
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return false;
        }

        return await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        // This is a placeholder. Implement your authorization logic here.
        return await Task.FromResult(true);
    }

    public async Task<ErrorOr<string>> GetUserIdAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        return user.Id.ToString();
    }

    public async Task<ErrorOr<Success>> DeleteUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        var result = await _userManager.DeleteAsync(user);

        if (result.Succeeded)
        {
            return Result.Success;
        }

        return Error.Failure(description: result.Errors.First().Description);
    }

    public async Task<ErrorOr<Success>> ConfirmEmail(string userId, string confirmationToken)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
        {
            return Error.NotFound(description: "User not found");
        }

        var result = await _userManager.ConfirmEmailAsync(user, confirmationToken);

        return result.Succeeded ? Result.Success : Error.Failure(description: "Account Confirmation Failed");
    }

    public async Task<ErrorOr<Success>> AssignRoleAsync(string userId, string role)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        var isInRole = await _userManager.IsInRoleAsync(user, role);
        if (isInRole)
        {
            return Error.Conflict(description: $"User is already in role '{role}'.");
        }

        var result = await _userManager.AddToRoleAsync(user, role);
        if (result.Succeeded)
        {
            return Result.Success;
        }

        return Error.Failure(description: $"Failed to assign role: {result.Errors.First().Description}");
    }

    public async Task<ErrorOr<string>> GenerateEmailConfirmationTokenAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Error.NotFound(description: "User not found.");
        }

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        return token;
    }

    public ChallengeResult SetupExternalAuthProvider(string provider, string redirectUrl)
    {
        var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        return new ChallengeResult(provider, properties);
    }

    public async Task<ErrorOr<Success>> HandleOAuth(string source, HttpContext httpContext)
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info == null)
            return Error.NotFound("External login provider not found.");

        var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);

        ApplicationUser user;
        if (result.Succeeded)
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            user = (await _userManager.FindByEmailAsync(email!))!;
        }
        else
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            var firstName = info.Principal.FindFirstValue(ClaimTypes.GivenName);
            var lastName = info.Principal.FindFirstValue(ClaimTypes.Surname);
            user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                FirstName = firstName!,
                LastName = lastName!,
                EmailConfirmed = true,
                RefreshToken = "",
            };
            List<Error> errors = [];
            var identityResult = await _userManager.CreateAsync(user);
            if (!identityResult.Succeeded)
            {
                return Error.Validation(description: identityResult.Errors.First().Description);
            }

            switch (source)
            {
                case "recruiter":
                    {
                        var newRecruiter = new Recruiter(user.Id);
                        await _recruiterRepository.AddAsync(newRecruiter);
                        break;
                    }
                case "candidate":
                    // do something related to candidate    
                    break;
            }

            await _userManager.AddLoginAsync(user, info);
        }

        var tokens = await GenerateTokensAndUpdateUser(user, source);
        SetTokenInCookie(tokens, httpContext);
        return Result.Success;
    }

    public async Task<ErrorOr<Success>> RefreshTokenAsync(string accessToken, string refreshToken)
    {
        var userPrincipal = GetPrincipalFromToken(accessToken);

        var userId = _userManager.GetUserId(userPrincipal.Value)!;
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null) return Error.Unauthorized();

        if (user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            return Error.Unauthorized(description: "Invalid Refresh Token");
        }

        var role = userPrincipal.Value.FindFirstValue(ClaimTypes.Role);
        await GenerateTokensAndUpdateUser(user, role);

        return Result.Success;
    }

    public async Task<ErrorOr<ApplicationUserDto>> GetUserById(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        return user is not null ? _mapper.Map<ApplicationUserDto>(user) : Error.NotFound(description: "User not found.");
    }

    public async Task<ErrorOr<bool>> SignIn(string email, string password, string source, HttpContext httpContext)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return Error.Unauthorized(description: "Email or Password is incorrect");
        }

        var isCorrectPassword = await _userManager.CheckPasswordAsync(user, password);

        if (!isCorrectPassword) return Error.Unauthorized(description: "Email or Password is incorrect");

        var tokens = await GenerateTokensAndUpdateUser(user, source);
        SetTokenInCookie(tokens, httpContext);
        return true;
    }


    #region private methods

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

    private async Task<TokenResponse> GenerateTokensAndUpdateUser(ApplicationUser user, string source)
    {
        List<Claim> claims = [
            new (ClaimTypes.NameIdentifier, user.Id.ToString()),
                new (ClaimTypes.Email, user.Email!),
                new ("firstName", user.FirstName),
                new ("lastName", user.LastName)
        ];

        switch (source.ToLower())
        {
            case "recruiter":
                {
                    var spec = new RecruiterByIdentityIdSpec(user.Id);
                    var recruiter = await _recruiterRepository.FirstOrDefaultAsync(spec);

                    if (recruiter != null)
                    {
                        claims.Add(new Claim("companyId", recruiter.CompanyId.ToString() ?? ""));
                        claims.Add(new Claim(ClaimTypes.Role, "Recruiter"));
                    }

                    break;
                }
            case "candidate":
                // Add claims specific to a candidate (optional)
                break;
        }

        var token = new JwtSecurityToken(
            issuer: _jwtOptions.Issuer,
            audience: _jwtOptions.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtOptions.TokenExpirationInMinutes),
            signingCredentials: _signingCredentials
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        user.RefreshToken = Guid.NewGuid().ToString("N");
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationInDays);

        await _userManager.UpdateAsync(user);

        return new TokenResponse(jwt, user.RefreshToken, user.RefreshTokenExpiryTime);
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

    #endregion
}