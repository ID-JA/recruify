using Recruify.Domain.Common;

namespace Recruify.Domain.Companies.Events;

internal class NewLocationAddedEvent : DomainEventBase
{
    private Company company;
    private CompanyLocation location;

    public NewLocationAddedEvent(Company company, CompanyLocation location)
    {
        this.company = company;
        this.location = location;
    }
}