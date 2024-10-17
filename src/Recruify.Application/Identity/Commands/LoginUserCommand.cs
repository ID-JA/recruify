using ErrorOr;
using Microsoft.AspNetCore.Http;
using Recruify.Application.Common.Interfaces;
using Recruify.Domain.Common;

namespace Recruify.Application.Identity.Commands;

public record LoginUserCommand(string Email, string Password) : ICommand<ErrorOr<bool>>;


public class LoginUserHandler(IIdentityService _identityService, IHttpContextAccessor httpContextAccessor) : ICommandHandler<LoginUserCommand, ErrorOr<bool>>
{
    public async Task<ErrorOr<bool>> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.SignIn(request.Email, request.Password, httpContextAccessor.HttpContext!);

        if (result.IsError) return result.Errors;

        return result.Value;
    }
}
