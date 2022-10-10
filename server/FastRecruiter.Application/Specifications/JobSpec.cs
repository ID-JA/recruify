using Ardalis.Specification;
using FastRecruiter.Application.Job;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class JobSpec : Specification<JobEntity, JobOfferDto>, ISingleResultSpecification
    {
        public JobSpec(string id)
        {
            Query.Where(j => j.Id == id);
        }

    }
}
