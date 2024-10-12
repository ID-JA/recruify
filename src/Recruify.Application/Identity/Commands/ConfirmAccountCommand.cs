using ErrorOr;
using Microsoft.AspNetCore.Identity;
using Recruify.Domain.Common;

namespace Recruify.Application.Identity.Commands;

public record ConfirmAccountCommand(string UserId, string Token) : ICommand<ErrorOr<Success>>;