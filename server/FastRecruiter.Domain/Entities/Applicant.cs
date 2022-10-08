namespace FastRecruiter.Domain.Entities;

public class Applicant
{
    public string Id { get; private set; }

    public string Name { get; private set; }

    public string Email { get; private set; }

    public bool EmailConfirmation { get; private set; }

    public int PhoneNumber { get; private set; }

    public Job Job { get; private set; }
    public string JobId { get; private set; }

    public virtual ICollection<Experience> Experiences { get; private set; }
    public virtual ICollection<Education> Educations { get; private set; }

    public static string CreateApplicant(string name, string email, bool emailConfirmation, int phoneNumber, string jobId)
    {
        var applicant = new Applicant
        {
            Id = Guid.NewGuid().ToString(),
            Name = name,
            Email = email,
            EmailConfirmation = emailConfirmation,
            PhoneNumber = phoneNumber,
            JobId = jobId
        };

        return applicant.Id;
    }


}
