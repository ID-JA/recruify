using Ardalis.Specification;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class JobByIdWithApplicantsSpec : Specification<JobEntity>
    {
        public JobByIdWithApplicantsSpec(string jobId, string employerId)
        {
            Query
                .Where(j => j.Id == jobId && j.EmployerId == employerId)
                .Include(j => j.Applicants).ThenInclude(a => a.Educations)
                .Include(j => j.Applicants).ThenInclude(a => a.Experiences);
        }
    }
}
