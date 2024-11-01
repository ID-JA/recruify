using Ardalis.GuardClauses;
using Recruify.Domain.Common;

namespace Recruify.Domain.Companies;

public class CompanyLocation : EntityBase<Guid>
{
    public bool IsPrimaryLocation { get; private set; }
    public string Name { get; private set; }
    public string? StreetAddress { get; private set; }
    public string? Building { get; private set; }
    public string? City { get; private set; }
    public string? State { get; private set; }
    public int PostCode { get; private set; }
    public string? Country { get; private set; }
    public Guid CompanyId { get; private set; }

    public Company Company { get; } = null!;

    public CompanyLocation(string name, bool isPrimaryLocation, string? streetAddress, string? building, string? city, string? state, int postCode, string? country, Guid companyId)
    {
        if (postCode <= 0)
            throw new ArgumentException("Post code must be a positive number.", nameof(postCode));
        Name = Guard.Against.NullOrEmpty(name, nameof(name));
        IsPrimaryLocation = isPrimaryLocation;
        StreetAddress = streetAddress;
        Building = building;
        City = city;
        State = state;
        PostCode = postCode;
        Country = country;
        CompanyId = companyId;
    }

    public void MarkAsPrimary()
    {
        IsPrimaryLocation = true;
    }

    public void MarkAsNonPrimary()
    {
        IsPrimaryLocation = false;
    }

}
