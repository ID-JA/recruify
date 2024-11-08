using ErrorOr;
using Recruify.Application.Common.Interfaces;
using Recruify.Domain.Common;
using Recruify.Domain.Companies;
using Recruify.Domain.Enums;
using Recruify.Domain.Recruiters;
using Recruify.Domain.Recruiters.Specifications;

namespace Recruify.Infrastructure.Services;

public class RecruiterService(IRepository<Recruiter> recruiterRepository, ICurrentUser currentUser) : IRecruiterService
{
    public async Task<ErrorOr<Recruiter>> GetCurrentRecruiterAsync(CancellationToken cancellationToken)
    {
        var recruiterId = currentUser.GetUserId();
        var recruiterSpec = new RecruiterByIdentityIdSpec(recruiterId);
        var recruiter = await recruiterRepository.FirstOrDefaultAsync(recruiterSpec, cancellationToken);

        if (recruiter == null)
        {
            return Error.NotFound("Recruiter not found.");
        }

        return recruiter;
    }

    public async Task UpdateAsync(Recruiter recruiter, CancellationToken cancellationToken)
    {
        await recruiterRepository.UpdateAsync(recruiter, cancellationToken);
    }
}