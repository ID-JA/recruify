using Ardalis.Specification;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class JobWithApplicantsById : Specification<JobEntity>
    {
        public JobWithApplicantsById(string jobId, string employerId)
        {
            Query
                .Include(j => j.Applicants).ThenInclude(a => a.Educations).AsSplitQuery()
                .Include(j => j.Applicants).ThenInclude(a => a.Experiences).AsSplitQuery()
                .Where(j => j.Id == jobId && j.EmployerId == employerId);
        }


    }
}
