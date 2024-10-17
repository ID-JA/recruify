using ErrorOr;
using Microsoft.AspNetCore.Http;

namespace Recruify.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<ErrorOr<bool>> SignIn(string email, string password, HttpContext httpContext);
    Task<ErrorOr<string>> CreateUserAsync(string firstName, string lastName, string email, string password);
    Task<ErrorOr<Success>> AssignRoleAsync(string userId, string role);
    Task<ErrorOr<string>> GetUserNameAsync(string userId);
    Task<bool> IsInRoleAsync(string userId, string role);
    Task<bool> AuthorizeAsync(string userId, string policyName);
    Task<ErrorOr<string>> GetUserIdAsync(string email);
    Task<ErrorOr<Success>> DeleteUserAsync(string userId);
    Task<ErrorOr<Success>> ConfirmEmail(string userId, string confirmationToken);
    Task<ErrorOr<string>> GenerateEmailConfirmationTokenAsync(string userId);
}