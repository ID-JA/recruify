namespace FastRecruiter.Domain.Entities;

public class Employer
{
    private Employer()
    {

    }
    public string Id { get; private set; } // PK

    public string IdentityId { get; private set; } // FK

    public string CompanyName { get; private set; }

    public string CompanyLocation { get; private set; }

    public string? CompanyWebsite { get; private set; }

    public string Position { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Job>? Jobs { get; set; }

    public static Employer CreateEmployer(string identityId, string companyName, string companyLocation, string? companyWebsite, string position)
    {
        // TODO: Add validation and throw exceptions
        var employer = new Employer
        {
            Id = Guid.NewGuid().ToString(),
            IdentityId = identityId,
            CompanyName = companyName,
            CompanyLocation = companyLocation,
            CompanyWebsite = companyWebsite,
            Position = position,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        return employer;
    }

    public void UpdateEmployer(string companyName, string companyLocation, string? companyWebsite, string position)
    {
        CompanyName = companyName;
        CompanyLocation = companyLocation;
        CompanyWebsite = companyWebsite;
        Position = position;
        UpdatedAt = DateTime.UtcNow;
    }
}


