using AutoMapper;
using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Exceptions;
using FastRecruiter.Api.Identity.Tokens;
using FastRecruiter.Api.Identity.Users.Features.Onboarding;
using FastRecruiter.Api.Identity.Users.Features.RegisterUser;
using FastRecruiter.Api.Identity.Users.Features.UserInfo;
using FastRecruiter.Api.Jobs;
using FastRecruiter.Api.Mail;
using FastRecruiter.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FastRecruiter.Api.Identity.Users;

public interface IUserService
{
    Task AssignRoleAndPermissionsToUserAsync(string role, IReadOnlyList<AppPermission> permissions, User user); Task<RegisterUserResponse> RegisterAsync(RegisterUserRequest request, string serverUrl, CancellationToken cancellationToken);
    ChallengeResult SetupExternalAuthentication(string provider, string redirectUrl);
    Task<User> HandleExternalAuthenticationCallbackAsync();
    Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken = default);
    Task<bool> ConfirmEmailAsync(string userId, string confirmationToken, CancellationToken cancellationToken);
    Task<UserDto?> GetUserInfo();
    Task<bool> InvitationToCompanyHandler(string email, string token, CancellationToken cancellationToken = default);
    Task AssignUserToCompanyAsync(Guid userId, Guid companyId, string role, CancellationToken cancellationToken);
}


public class UserService(UserManager<User> _userManager,
                         SignInManager<User> _signInManager,
                         ApplicationDbContext _dbContext,
                         ICurrentUser _currentUser,
                         ITokenService _tokenService,
                         IMapper _mapper,
                         IMailService _mailService) : IUserService
{

    public async Task AssignRoleAndPermissionsToUserAsync(string role, IReadOnlyList<AppPermission> permissions, User user)
    {
        if (!await _userManager.IsInRoleAsync(user, role))
        {
            await _userManager.AddToRoleAsync(user, role);
            var existingPermissions = await _dbContext.UserPermissions
            .Where(up => up.UserId == user.Id)
            .Select(up => up.Permission)
            .ToListAsync();

            var newUserPermissions = permissions
                .Where(permission => !existingPermissions.Contains(permission.Name))
                .Select(permission => new UserPermission
                {
                    UserId = user.Id,
                    Permission = permission.Name,
                    IsAllowed = true,
                })
                .ToList();

            if (newUserPermissions.Count != 0)
            {
                await _dbContext.UserPermissions.AddRangeAsync(newUserPermissions);
                await _dbContext.SaveChangesAsync();
            }
        }
    }


    public ChallengeResult SetupExternalAuthentication(string provider, string redirectUrl)
    {
        var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        return new ChallengeResult(provider, properties);
    }

    public async Task<User> HandleExternalAuthenticationCallbackAsync()
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info == null)
            throw new ValidationException("External login information not available.");

        var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);

        if (result.Succeeded)
        {
            var user = await _userManager.FindByEmailAsync(info.Principal.FindFirstValue(ClaimTypes.Email)!);
            return user is null ? throw new NotFoundException("User not found") : user;
        }
        else
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            var firstName = info.Principal.FindFirstValue(ClaimTypes.GivenName);
            var lastName = info.Principal.FindFirstValue(ClaimTypes.Surname);
            var picture = info.Principal.FindFirstValue("picture");
            var user = new User
            {
                UserName = email,
                Email = email,
                FirstName = firstName!,
                LastName = lastName!,
                EmailConfirmed = true,
                ImageUrl = picture ?? $"https://api.dicebear.com/9.x/initials/svg?seed={firstName}+{lastName}",
                Role = "Owner",
                CreatedAt = DateTime.UtcNow,
            };

            var identityResult = await _userManager.CreateAsync(user);
            if (!identityResult.Succeeded)
                throw new ValidationException("one or more validation errors occurred while creating user account", identityResult.Errors.Select(e => e.Description));

            await _userManager.AddLoginAsync(user, info);

            return user;
        }
    }

    public async Task<RegisterUserResponse> RegisterAsync(RegisterUserRequest request, string serverUrl, CancellationToken cancellationToken)
    {
        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            UserName = request.Email.Split('@')[0],
            Role = "Owner",
            ImageUrl = $"https://api.dicebear.com/9.x/initials/svg?seed={request.FirstName}+{request.LastName}",
            CreatedAt = DateTime.UtcNow,
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(error => error.Description).ToList();
            throw new ValidationException("one or more validation errors occurred while registering a the user", errors);
        }

        await AssignRoleAndPermissionsToUserAsync("Owner", AppPermissions.Owner, user);

        // TODO: move sending confirmation email to background job
        if (!string.IsNullOrEmpty(user.Email))
        {
            string emailVerificationUri = await GetEmailVerificationUriAsync(user, serverUrl);
            var emailBody = await _mailService.RenderMailTemplateAsync("email-confirmation", new { FullName = user.FirstName, ConfirmationLink = emailVerificationUri });
            var mailRequest = new MailRequest([user.Email], "Confirm Registration", emailBody);
            await _mailService.SendAsync(mailRequest, CancellationToken.None);
        }

        var tokens = await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(user.Email, request.Password, false), cancellationToken);

        return new RegisterUserResponse(user.Id, tokens);
    }

    public async Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId)
                   ?? throw new UnauthorizedAccessException();

        return await _dbContext.UserPermissions
            .AnyAsync(up => up.UserId == user.Id && up.Permission == permission && up.IsAllowed, cancellationToken);
    }


    public async Task<bool> ConfirmEmailAsync(string userId, string confirmationToken, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(userId) ?? throw new NotFoundException("User not found.");

        var result = await _userManager.ConfirmEmailAsync(user, confirmationToken);

        if (!result.Succeeded)
        {
            throw new ValidationException("Account Confirmation Failed", result.Errors.Select(e => e.Description));
        }

        return true;
    }

    private async Task<string> GetEmailVerificationUriAsync(User user, string serverUrl)
    {
        string toekn = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        const string route = "api/auth/confirm-email";
        var endpointUri = new Uri(string.Concat($"{serverUrl}/", route));
        string verificationUri = QueryHelpers.AddQueryString(endpointUri.ToString(), "userId", user.Id.ToString());
        verificationUri = QueryHelpers.AddQueryString(verificationUri, "token", toekn);
        return verificationUri;
    }

    public async Task<UserDto?> GetUserInfo()
    {
        var userId = _currentUser.GetUserId();

        var userInfo = (await _userManager.FindByIdAsync(userId.ToString()))!;

        return _mapper.Map<User, UserDto>(userInfo);
    }

    public async Task<bool> InvitationToCompanyHandler(string email, string token, CancellationToken cancellationToken = default)
    {

        var userAlreadyExists = await _userManager.FindByEmailAsync(email);

        if (userAlreadyExists is null)
        {
            var user = new User
            {
                Email = email,
                Role = "Member",
                FirstName = string.Empty,
                LastName = string.Empty,
            };

            // Check what could happen if email is already exists
            // maybe catch  then throw confilict exception
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }
        return true;
    }

    public async Task AssignUserToCompanyAsync(Guid userId, Guid companyId, string role, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if(user is null)
        {
            throw new Exception("User not found");
        }
        user.CompanyId = companyId;
        user.Role = role;
        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}


