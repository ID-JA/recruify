namespace FastRecruiter.API.Models.Entities;

public class Applicant
{
    public string Id { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public bool EmailConfirmation { get; set; }

    public int PhoneNumber { get; set; }

    public Job Job { get; set; }
    public string JobId { get; set; }

    public virtual ICollection<Experience> Experiences { get; set; }
    public virtual ICollection<Education> Educations { get; set; }

}
