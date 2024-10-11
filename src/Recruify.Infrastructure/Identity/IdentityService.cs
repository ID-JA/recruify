using ErrorOr;
using Microsoft.AspNetCore.Identity;
using Recruify.Application.Common.Interfaces;
namespace Recruify.Infrastructure.Identity;

public class IdentityService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<Guid>> roleManager) : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager = roleManager;

    public async Task<ErrorOr<string>> CreateUserAsync(string firstName, string lastName, string email, string password)
    {
        var user = new ApplicationUser
        {
            FirstName = firstName,
            LastName = lastName,
            UserName = email,
            Email = email
        };

        var result = await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            return user.Id.ToString();
        }

        return Error.Failure(result.Errors.First().Description);
    }

    public async Task<ErrorOr<string>> GetUserNameAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Error.NotFound("User not found.");
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
            return Error.NotFound("User not found.");
        }

        return user.Id.ToString();
    }

    public async Task<ErrorOr<Success>> DeleteUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Error.NotFound("User not found.");
        }

        var result = await _userManager.DeleteAsync(user);

        if (result.Succeeded)
        {
            return Result.Success;
        }

        return Error.Failure(result.Errors.First().Description);
    }

    public async Task<ErrorOr<Success>> ConfirmEmail(string userId, string confirmationToken)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
        {
            return Error.NotFound("User not found");
        }

        var result = await _userManager.ConfirmEmailAsync(user, confirmationToken);

        return result.Succeeded ? Result.Success : Error.Failure("Account Confirmation Failed");
    }

    public async Task<ErrorOr<Success>> AssignRoleAsync(string userId, string role)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return Error.NotFound("User not found.");
        }

        var isInRole = await _userManager.IsInRoleAsync(user, role);
        if (isInRole)
        {
            return Error.Conflict($"User is already in role '{role}'.");
        }

        var result = await _userManager.AddToRoleAsync(user, role);
        if (result.Succeeded)
        {
            return Result.Success;
        }

        return Error.Failure($"Failed to assign role: {result.Errors.First().Description}");
    }
}