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

    public int nbrCandidates { get; private set; }

    public string? ShortUrl { get; set; }

    public string? Url { get; set; }

    public Status Status { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime UpdatedAt { get; private set; }

    public Employer Employer { get; private set; }

    public ICollection<Applicant> Applicants { get; private set; }

    public static Job CreateJob(string employerId, string title, string location, string address, string employmentType, string description, string whyUs, string companyDescription, int SavaAsDraft, string skills,string url)
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
            Url = url,
            nbrCandidates = 0,
            Status = SavaAsDraft == 0 ? Status.Draft : Status.Published,  // if user click on publish button then status will be published otherwise it will be draft
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        return job;
    }

    public void UpdateJob(string title, string location, string address, string employmentType, string description, string whyUs, string companyDescription, string skills, int savaAsDraft)
    {
        Title = title;
        Location = location;
        Address = address;
        EmploymentType = employmentType;
        Description = description;
        WhyUs = whyUs;
        CompanyDescription = companyDescription;
        Skills = skills;
        Status = savaAsDraft == 1 ? Status.Published : savaAsDraft == 0 ? Status.Draft : Status.Closed;
        UpdatedAt = DateTime.UtcNow;
    }

    public void PublishJob()
    {
        Status = Status.Published;
        UpdatedAt = DateTime.UtcNow;
    }

    public void ArchiveJob()
    {
        Status = Status.Archived;
        UpdatedAt = DateTime.UtcNow;
    }

    public void DraftJob()
    {
        Status = Status.Draft;
        UpdatedAt = DateTime.UtcNow;
    }

    public void CloseJob()
    {
        Status = Status.Closed;
        UpdatedAt = DateTime.UtcNow;
    }

    // apply to job offer method
    public void ApplyToJob()
    {
        // Applicants.Add(newApplicant);
        nbrCandidates++;
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


