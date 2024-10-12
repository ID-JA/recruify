using ErrorOr;
using Microsoft.AspNetCore.Identity;
using Recruify.Application.Common.Interfaces;
using Recruify.Application.Identity.Commands;
using Recruify.Domain.Common;

namespace Recruify.Application.Identity.Handlers;

public class ConfirmAccountCommandHandler : ICommandHandler<ConfirmAccountCommand, ErrorOr<Success>>
{
    private readonly IIdentityService _identityService;

    public ConfirmAccountCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<ErrorOr<Success>> Handle(ConfirmAccountCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.ConfirmEmail(request.UserId, request.Token);
        return result;
    }
}
