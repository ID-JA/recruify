using Ardalis.Specification;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class EmployerJobsSpec : Specification<JobEntity>
    {
        public EmployerJobsSpec(string employerId)
        {
            Query
                .Where(j => j.EmployerId == employerId)
                .Include(j => j.Employer)
                .Include(j => j.Applicants);
        }
    }
}
