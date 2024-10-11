using ErrorOr;
using Recruify.Domain.Common;
using Recruify.Domain.Enums;

namespace Recruify.Application.Identity.Commands;

public record RegisterUserCommand(string FirstName, string LastName, string Email, string Password, UserType UserType) : ICommand<ErrorOr<string>>
{
}
