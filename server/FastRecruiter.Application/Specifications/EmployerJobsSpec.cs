using Ardalis.Specification;
using FastRecruiter.Application.Job;
using FastRecruiter.Application.Job.Queries;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class EmployerJobsSpec : EntitiesByPaginationFilterSpec<JobEntity, JobDto>
    {
        public EmployerJobsSpec(GetJobListQuery request, string employerId) : base(request)
        {
            Query
                .Where(j => j.Employer.IdentityId == employerId)
                .Include(j => j.Employer)
                .Include(j => j.Applicants);
        }
    }
}
