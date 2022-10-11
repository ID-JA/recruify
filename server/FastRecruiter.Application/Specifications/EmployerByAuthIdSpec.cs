using Ardalis.Specification;
using FastRecruiter.Domain.Entities;

namespace FastRecruiter.Application.Specifications
{
    public class EmployerByAuthIdSpec : Specification<Employer>, ISingleResultSpecification
    {
        public EmployerByAuthIdSpec(string idetintyId)
        {
            Query.Where(e => e.IdentityId == idetintyId);
        }
    }
}
