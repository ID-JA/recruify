using Ardalis.Specification;
using JobEnity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class OfferByIdSpec : Specification<JobEnity>
    {
        public OfferByIdSpec(string jobId)
        {
            Query
                .Where(j => j.Id == jobId);
        }

        public OfferByIdSpec(string jobId, string employerId)
        {
            Query.Where(j => j.Id == jobId && j.EmployerId == employerId);
        }
    }
}
