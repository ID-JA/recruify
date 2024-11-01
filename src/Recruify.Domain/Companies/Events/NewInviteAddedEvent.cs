using Recruify.Domain.Common;

namespace Recruify.Domain.Companies.Events;

public class NewInviteAddedEvent : DomainEventBase
{
    public CompanyInvite NewInvite { get; set; }
    public Company Company { get; set; }

    public NewInviteAddedEvent(Company company, CompanyInvite newInvite)
    {
        NewInvite = newInvite;
        Company = company;
    }
}
