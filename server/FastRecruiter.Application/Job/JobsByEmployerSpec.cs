using Ardalis.Specification;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class JobsByEmployerSpec : Specification<JobEntity, JobDto>
    {
        public JobsByEmployerSpec(string employerId)
        {
            Query.Where(j => j.EmployerId == employerId)/*.Include(i => i.Applicants)*/;
        }
    }
}
