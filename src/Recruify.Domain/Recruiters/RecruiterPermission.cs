using Ardalis.GuardClauses;
using Recruify.Domain.Common;
using Recruify.Domain.Companies;

namespace Recruify.Domain.Recruiters;

public class RecruiterPermission : EntityBase<Guid>
{
    public string Permission { get; private set; }
    public bool IsAllowed { get; private set; }
    public Guid RecruiterId { get; private set; }
    public Recruiter Recruiter { get; } = null!;
    public Guid CompanyId { get; private set; }
    public Company Company { get; } = null!;

    public RecruiterPermission(Guid recruiterId, string permission, bool isAllowed, Guid companyId)
    {
        RecruiterId = recruiterId;
        Permission = Guard.Against.NullOrEmpty(permission, nameof(permission));
        IsAllowed = isAllowed;
        CompanyId = companyId;
    }

    public void UpdatePermission(bool isAllowed)
    {
        IsAllowed = isAllowed;
    }
}
