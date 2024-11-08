using Ardalis.Specification;

namespace Recruify.Domain.Recruiters.Specifications;

public sealed class RecruiterByIdentityIdSpec : Specification<Recruiter>, ISingleResultSpecification<Recruiter>
{
    public RecruiterByIdentityIdSpec(Guid identityId)
    {
        Query.Where(x => x.IdentityUserId == identityId);
    }
}