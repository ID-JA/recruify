using AutoMapper;
using ErrorOr;
using Recruify.Application.Common.Interfaces;
using Recruify.Application.Identity.Dtos;
using Recruify.Application.Recruiters;
using Recruify.Domain.Common;
using Recruify.Domain.Enums;
using Recruify.Domain.Recruiters;
using Recruify.Domain.Recruiters.Specifications;

namespace Recruify.Application.Identity.Queries;

public record GetCurrentUserQuery : IQuery<ErrorOr<ApplicationUserDto>>;

public class GetCurrentUserQueryHandler(ICurrentUser currentUser, IRepository<Recruiter> recruiterRepository, IIdentityService identityService) : IQueryHandler<GetCurrentUserQuery, ErrorOr<ApplicationUserDto>>
{
    public async Task<ErrorOr<ApplicationUserDto>> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var userId = currentUser.GetUserId();
        var userRole = currentUser.GetUserRole();

        // Retrieve base user information
        var userResult = await identityService.GetUserById(userId.ToString());
        if (userResult.IsError)
            return Error.NotFound($"User with ID {userId} not found.");
        
        var user = userResult.Value;

        return userRole switch
        {
            UserType.Recruiter => await GetRecruiterUserDtoAsync(user, userId, cancellationToken),
            _ => Error.Validation("InvalidRole", $"User role '{userRole}' is not supported.")
        };
    }

    private async Task<ErrorOr<ApplicationUserDto>> GetRecruiterUserDtoAsync(ApplicationUserDto user, Guid userId, CancellationToken cancellationToken)
    {
        var recruiterSpec = new RecruiterByIdentityIdSpec(userId);
        var recruiter = await recruiterRepository.FirstOrDefaultAsync(recruiterSpec, cancellationToken);

        if (recruiter == null)
            return Error.NotFound($"Recruiter with IdentityId {userId} not found.");

        var recruiterInfo = new RecruiterDto(
            recruiter.Id,
            recruiter.IdentityUserId,
            recruiter.CompanyId,
            recruiter.Role
        );

        return user with { RecruiterInfo = recruiterInfo };
    }
}