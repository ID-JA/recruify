namespace FastRecruiter.Domain.Entities;

public class Education
{
    private Education()
    {

    }
    public int Id { get; private set; }

    public string School { get; private set; }

    public string Degree { get; private set; }

    public bool InProgress { get; private set; }

    public int DegreeYear { get; private set; }

    public string? Description { get; private set; }

    public Applicant Applicant { get; private set; }
    public string ApplicantId { get; private set; }

    public static Education CreateEducation(string school, string degree, bool inProgress, int degreeYear, string? description, string applicantId)
    {
        var education = new Education
        {
            School = school,
            Degree = degree,
            InProgress = inProgress,
            DegreeYear = degreeYear,
            Description = description,
            ApplicantId = applicantId
        };

        return education;
    }
}
