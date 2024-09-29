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

    public CompanyInvite(string email, Guid companyId, Guid token)
    {
        Email = email;
        CompanyId = companyId;
        Token = token;
    }
}
