using Recruify.Domain.Common;

namespace Recruify.Domain.Companies.Events;

public class InviteCancelledEvent : DomainEventBase
{
    public CompanyInvite CompanyInvite { get; set; }
    public Company Company { get; set; }

    public InviteCancelledEvent(Company company, CompanyInvite companyInvite)
    {
        Company = company;
        CompanyInvite = companyInvite;
    }
}
