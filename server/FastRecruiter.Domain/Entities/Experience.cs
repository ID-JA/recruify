namespace FastRecruiter.Domain.Entities;

public class Experience
{
    private Experience()
    {

    }

    public string Id { get; private set; }

    public string Position { get; private set; }

    public string Company { get; private set; }

    public bool StillWorking { get; private set; }

    public int StartYear { get; private set; }

    public string StartMonth { get; private set; }

    public int? EndYear { get; private set; }

    public string? EndMonth { get; private set; }

    public string? Description { get; private set; }

    public Applicant Applicant { get; private set; }
    public string ApplicantId { get; private set; }

    public static Experience CreateExperience(string position, string company, bool stillWorking, int startYear, string startMonth, int? endYear, string? endMonth, string? description, string applicantId)
    {
        var experience = new Experience
        {
            Id = Guid.NewGuid().ToString(),
            Position = position,
            Company = company,
            StillWorking = stillWorking,
            StartYear = startYear,
            StartMonth = startMonth,
            EndYear = endYear,
            EndMonth = endMonth,
            Description = description,
            ApplicantId = applicantId
        };

        return experience;
    }
}


