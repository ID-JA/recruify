using Recruify.Domain.Common;

namespace Recruify.Domain.Companies.Events;

class PrimaryLocationChangedEvent : DomainEventBase
{
    public CompanyLocation CompanyLocation { get; set; }
    public Company Company { get; set; }

    public PrimaryLocationChangedEvent(Company company, CompanyLocation companyLocation)
    {
        CompanyLocation = companyLocation;
        Company = company;
    }
}
