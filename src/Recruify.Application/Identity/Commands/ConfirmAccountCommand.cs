using ErrorOr;
using Recruify.Application.Common.Interfaces;
using Recruify.Domain.Common;

namespace Recruify.Application.Identity.Commands;

public record ConfirmAccountCommand(string UserId, string Token) : ICommand<ErrorOr<Success>>;

public class ConfirmAccountHandler(IIdentityService identityService) : ICommandHandler<ConfirmAccountCommand, ErrorOr<Success>>
{
    public async Task<ErrorOr<Success>> Handle(ConfirmAccountCommand request, CancellationToken cancellationToken)
    {
        return await identityService.ConfirmEmail(request.UserId, request.Token);
    }
}
