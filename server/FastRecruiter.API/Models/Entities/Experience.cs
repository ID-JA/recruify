namespace FastRecruiter.API.Models.Entities;

public class Experience
{
    public string Id { get; set; }

    public string Position { get; set; }

    public string Company { get; set; }

    public bool StillWorking { get; set; }

    public int StartYear { get; set; }

    public string StratMonth { get; set; }

    public int? EndYear { get; set; }

    public string? EndMonth { get; set; }

    public string? Description { get; set; }

    public Applicant Applicant { get; set; }
    public string ApplicantId { get; set; }
}


