using Ardalis.Specification;
using FastRecruiter.Application.Job;
using JobEnity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Specifications
{
    public class OfferByIdSpec : Specification<JobEnity, OfferDto>
    {
        public OfferByIdSpec(string jobId)
        {
            Query
                .Where(j => j.Id == jobId);
        }
    }
}
