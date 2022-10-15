namespace FastRecruiter.Application.Job
{
    public class ApplicantDto
    {
        public string? Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<ExperienceDto> Experiences { get; set; } = new List<ExperienceDto>();
        public ICollection<EducationDto> Educations { get; set; } = new List<EducationDto>();
    }

    public class EducationDto
    {
        public string School { get; set; } = default!;
        public string Degree { get; set; } = default!;
        public bool InProgress { get; set; }
        public int DegreeYear { get; set; }
        public string? Description { get; set; }
    }

    public class ExperienceDto
    {
        public string Position { get; set; } = default!;
        public string Company { get; set; } = default!;
        public bool StillWorking { get; set; }
        public int StartYear { get; set; }
        public string StartMonth { get; set; }
        public int? EndYear { get; set; }
        public string? EndMonth { get; set; }
        public string? Description { get; set; }
    }
}

