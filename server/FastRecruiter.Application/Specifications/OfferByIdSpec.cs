using Ardalis.Specification;
using JobEnity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class OfferByIdSpec : Specification<JobEnity>, ISingleResultSpecification
    {
        public OfferByIdSpec(string jobId)
        {
            Query
                .Where(j => j.Id == jobId).Include(j => j.Employer);
        }

        public OfferByIdSpec(string jobId, string employerId)
        {
            Query.Include(j => j.Employer)
            .Where(j => j.Id == jobId && j.EmployerId == employerId);
        }
    }
}
