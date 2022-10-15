using FastRecruiter.Domain.Contracts;

namespace FastRecruiter.Domain.Entities;

public class Applicant : IAggregateRoot
{
    public string Id { get; private set; }

    public string Name { get; private set; }

    public string Email { get; private set; }

    public bool EmailConfirmation { get; private set; }

    public string PhoneNumber { get; private set; }

    public Job Job { get; private set; }
    public string JobId { get; private set; }

    public ICollection<Experience> Experiences { get; private set; } = new List<Experience>();
    public ICollection<Education> Educations { get; private set; } = new List<Education>();

    public static Applicant CreateApplicant(string name, string email, string phoneNumber, string jobId)
    {
        var applicant = new Applicant
        {
            Id = Guid.NewGuid().ToString(),
            Name = name,
            Email = email,
            EmailConfirmation = false,
            PhoneNumber = phoneNumber,
            JobId = jobId,
        };

        return applicant;
    }

    public void AddExperience(Experience experience)
    {
        Experiences.Add(experience);
    }

    public void AddEducation(Education education)
    {
        Educations.Add(education);
    }


}
