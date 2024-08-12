using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Identity.Users.Features.Onboarding;
using FastRecruiter.Api.Models;
using FastRecruiter.Api.Identity.Users.Features.RegisterUser;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FastRecruiter.Api.Identity.Tokens;

namespace FastRecruiter.Api.Identity.Users;

public interface IUserService
{
    Task<RegisterUserResponse> RegisterAsync(RegisterUserRequest request, CancellationToken cancellationToken);
    Task<User?> HandleGoogleCallbackAsync();
    ChallengeResult HandleGoogleLogin(string redirectUrl);
    Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken = default);
    Task<Guid> OnboardingAsync(OnboardingUserRequest request, CancellationToken cancellationToken);

}


public class UserService(UserManager<User> _userManager,
                         SignInManager<User> _signInManager,
                         ApplicationDbContext _dbContext,
                         ICurrentUser _currentUser,
                         ITokenService _tokenService) : IUserService
{
    public ChallengeResult HandleGoogleLogin(string redirectUrl)
    {
        var properties = _signInManager.ConfigureExternalAuthenticationProperties("Google", redirectUrl);
        return new ChallengeResult("Google", properties);
    }

    public async Task<User?> HandleGoogleCallbackAsync()
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info == null)
            throw new Exception("External login information not available.");

        var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);

        if (result.Succeeded)
        {
            var user = await _userManager.FindByEmailAsync(info.Principal.FindFirstValue(ClaimTypes.Email)!);
            return user;
        }
        else
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            var firstName = info.Principal.FindFirstValue(ClaimTypes.GivenName);
            var lastName = info.Principal.FindFirstValue(ClaimTypes.Surname);

            var user = new User
            {
                UserName = email,
                Email = email,
                FirstName = firstName!,
                LastName = lastName!,
                EmailConfirmed = true,
            };

            var identityResult = await _userManager.CreateAsync(user);
            if (!identityResult.Succeeded)
                throw new Exception(string.Join(", ", identityResult.Errors.Select(e => e.Description)));

            await _userManager.AddLoginAsync(user, info);

            return user;
        }
    }

    public async Task<RegisterUserResponse> RegisterAsync(RegisterUserRequest request, CancellationToken cancellationToken)
    {
        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            UserName = request.Email.Split('@')[0],
            EmailConfirmed = true,
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(error => error.Description).ToList();
            throw new Exception("error while registering a new user");
        }

        await _userManager.AddToRoleAsync(user, "Admin"); // TODO: Assign user to role when the company is being created

        if (!string.IsNullOrEmpty(user.Email))
        {
            //string emailVerificationUri = await GetEmailVerificationUriAsync(user, origin);
            //var mailRequest = new MailRequest(
            //    new Collection<string> { user.Email },
            //    "Confirm Registration",
            //    emailVerificationUri);
            //jobService.Enqueue("email", () => mailService.SendAsync(mailRequest, CancellationToken.None));
        }

        var tokens = await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(user.Email, request.Password, false), cancellationToken);

        return new RegisterUserResponse(user.Id, tokens);
    }

    // TODO: FIX THIS
    public async Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId);

        _ = user ?? throw new UnauthorizedAccessException();

        var userClaims = await _userManager.GetClaimsAsync(user);
        return userClaims.Any(c => c.Type == "Permission" && c.Value == permission);
    }

    public async Task<Guid> OnboardingAsync(OnboardingUserRequest request, CancellationToken cancellationToken)
    {
        var company = new Company
        {
            Name = request.companyName,
        };

        _dbContext.Companies.Add(company);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var userId = _currentUser.GetUserId();

        var assignUserToCompany = new UserCompany
        {
            CompanyId = company.Id,
            AssignedAt = DateTime.UtcNow,
            IsOwner = true,
            UserId = userId
        };

        _dbContext.UserCompanies.Add(assignUserToCompany);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return company.Id;
    }
}


