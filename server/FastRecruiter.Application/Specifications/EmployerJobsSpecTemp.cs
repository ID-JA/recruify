using Ardalis.Specification;
using JobEntity = FastRecruiter.Domain.Entities.Job;
namespace FastRecruiter.Application.Specifications
{
    public class EmployerJobsSpecTemp : Specification<JobEntity>
    {
        public EmployerJobsSpecTemp(string employerId)
        {
            Query
                .Where(j => j.EmployerId == employerId)
                .Include(j => j.Employer)
                .Include(j => j.Applicants);
        }
    }
}
