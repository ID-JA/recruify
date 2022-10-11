using FastRecruiter.Domain.Contracts;
using FastRecruiter.Domain.Enums;

namespace FastRecruiter.Domain.Entities;

public class Job : IAggregateRoot
{
    private Job()
    {

    }

    public string Id { get; private set; }

    public string EmployerId { get; private set; }

    public string Title { get; private set; }

    public string Address { get; private set; }

    public string Location { get; private set; }

    public string EmploymentType { get; private set; }

    public string Description { get; private set; }

    public string Skills { get; private set; }

    public string WhyUs { get; private set; }

    public string CompanyDescription { get; private set; }

    public Status Status { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime UpdatedAt { get; private set; }

    public Employer Employer { get; private set; }

    public virtual ICollection<Applicant> Applicants { get; private set; }

    public static Job CreateJob(string employerId, string title, string location, string address, string employmentType, string description, string whyUs, string companyDescription, int SavaAsDraft, string skills)
    {
        var job = new Job
        {
            Id = Guid.NewGuid().ToString(),
            EmployerId = employerId,
            Title = title,
            Location = location,
            Address = address,
            EmploymentType = employmentType,
            Description = description,
            WhyUs = whyUs,
            CompanyDescription = companyDescription,
            Skills = skills,
            Status = SavaAsDraft == 1 ? Status.Draft : Status.Published,  // if user click on publish button then status will be published otherwise it will be draft
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        return job;
    }

    public void UpdateJob(string title, string location, string address, string employmentType, string description, string whyUs, string companyDescription)
    {
        Title = title;
        Location = location;
        Address = address;
        EmploymentType = employmentType;
        Description = description;
        WhyUs = whyUs;
        CompanyDescription = companyDescription;
        UpdatedAt = DateTime.UtcNow;
    }

    public void PublishJob()
    {
        Status = Status.Published;
        UpdatedAt = DateTime.UtcNow;
    }

    public void CloseJob()
    {
        Status = Status.Closed;
        UpdatedAt = DateTime.UtcNow;
    }

    // apply to job offer method
    public void ApplyToJob(Applicant newApplicant)
    {
        Applicants.Add(newApplicant);
    }

    // remove applicant
    public void RemoveApplicant(string applicantId)
    {
        var applicant = Applicants.FirstOrDefault(x => x.Id == applicantId);
        Applicants.Remove(applicant!);
    }

    public int TotalApplicants()
    {
        return Applicants.Count();
    }
}


