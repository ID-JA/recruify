using ErrorOr;
using Recruify.Domain.Companies;
using Recruify.Domain.Enums;

namespace Recruify.Domain.Recruiters;

public interface IRecruiterService
{
    Task<ErrorOr<Recruiter>> GetCurrentRecruiterAsync(CancellationToken cancellationToken);
    Task UpdateAsync(Recruiter recruiter, CancellationToken cancellationToken);
}