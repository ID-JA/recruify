using Ardalis.GuardClauses;
using Recruify.Domain.Common;

namespace Recruify.Domain.Companies;

public class CompanyInvite : EntityBase<Guid>
{
    public string Email { get; private set; }
    public Guid CompanyId { get; private set; }
    public Guid Token { get; private set; }
    public DateTime ExpireAt { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public Company Company { get; } = null!;

    public CompanyInvite(string email, Guid companyId, Guid token, DateTime expireAt)
    {
        Email = Guard.Against.NullOrEmpty(email, nameof(email));
        CompanyId = Guard.Against.Default(companyId, nameof(companyId));
        Token = Guard.Against.Default(token, nameof(token));

        CreatedAt = DateTime.UtcNow;
        ExpireAt = expireAt;
    }

    public bool IsExpired() => DateTime.UtcNow > ExpireAt;
}
