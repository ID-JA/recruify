using ErrorOr;
using Recruify.Application.Common.Interfaces;
using Recruify.Application.Identity.Commands;
using Recruify.Domain.Common;
using Recruify.Domain.Enums;
using Recruify.Domain.Recruiters;

namespace Recruify.Application.Identity.Handlers;

public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand, ErrorOr<string>>
{
    private readonly IIdentityService _identityService;
    private readonly IRepository<Recruiter> _recruiterRepository;

    public RegisterUserCommandHandler(IIdentityService identityService, IRepository<Recruiter> recruiterRepository)
    {
        _identityService = identityService;
        _recruiterRepository = recruiterRepository;
    }
    public async Task<ErrorOr<string>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.CreateUserAsync(request.FirstName, request.LastName, request.Email, request.Password);

        if (result.IsError)
        {
            return result.Errors;
        }

        string userId = result.Value;

        switch (request.UserType)
        {
            case UserType.Recruiter:
                var newRecruiter = new Recruiter(userId);
                await _recruiterRepository.AddAsync(newRecruiter, cancellationToken);
                break;
            default:
                return Error.Unexpected("Invalid user type");
        }

        return userId;
    }
}
