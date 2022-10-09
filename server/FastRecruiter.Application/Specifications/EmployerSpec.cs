using Ardalis.Specification;
using FastRecruiter.Domain.Entities;

namespace FastRecruiter.Application.Specifications
{
    public class EmployerSpec : Specification<Employer>, ISingleResultSpecification
    {
        public EmployerSpec(string idetintyId)
        {
            Query.Where(e => e.IdentityId == idetintyId);
        }
    }
}
