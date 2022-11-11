using Ardalis.Specification;
using FastRecruiter.Domain.Entities;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class CandidatesByJobSpec : Specification<Applicant>, ISingleResultSpecification
    {
        public CandidatesByJobSpec(string jobId, string employerId)
        {
            Query
            .Include(a => a.Job)
            .ThenInclude(j => j.Employer)
            .Where(a => a.JobId == jobId && a.Job.Employer.IdentityId == employerId);
        }
    }
}
