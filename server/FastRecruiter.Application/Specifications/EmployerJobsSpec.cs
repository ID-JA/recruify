using Ardalis.Specification;
using FastRecruiter.Application.Common.Models;
using FastRecruiter.Application.Job.Queries;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class EmployerJobsSpec : EntitiesByPaginationFilterSpec<JobEntity>
    {
        public EmployerJobsSpec(GetJobListQuery request, string employerId) : base(request)
        {
            Query
                .Include(j => j.Employer)
                .OrderBy(j => j.CreatedAt, !request.HasOrderBy())
                .Include(j => j.Applicants)
                .Where(j => j.Employer.IdentityId == employerId);
        }
    }



}
