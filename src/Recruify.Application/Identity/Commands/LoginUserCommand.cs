using ErrorOr;
using Microsoft.AspNetCore.Http;
using Recruify.Application.Common.Interfaces;
using Recruify.Domain.Common;

namespace Recruify.Application.Identity.Commands;

public record LoginUserCommand(string Email, string Password, string Source) : ICommand<ErrorOr<bool>>;


public class LoginUserHandler(IIdentityService identityService, IHttpContextAccessor httpContextAccessor) : ICommandHandler<LoginUserCommand, ErrorOr<bool>>
{
    public async Task<ErrorOr<bool>> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var result = await identityService.SignIn(request.Email, request.Password, request.Source,httpContextAccessor.HttpContext!);

        if (result.IsError) return result.Errors;

        return result.Value;
    }
}
