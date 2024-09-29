using Recruify.Domain.Common;

namespace Recruify.Domain.Companies.Events;

public class LocationRemovedEvent : DomainEventBase
{
    public CompanyLocation CompanyLocation { get; set; }
    public Company Company { get; set; }

    public LocationRemovedEvent(Company company, CompanyLocation companyLocation)
    {
        Company = company;
        CompanyLocation = companyLocation;
    }
}
