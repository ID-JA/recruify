﻿namespace FastRecruiter.API.Models;

public class Education
{
    public string Id { get; set; }
    public string School { get; set; }
    public string Degree { get; set; }
    public bool InPorgress { get; set; }
    public int DegreeYear { get; set; }
    public string? Description { get; set; }

    public Applicant Applicant { get; set; }
    public string ApplicantId { get; set; }
}