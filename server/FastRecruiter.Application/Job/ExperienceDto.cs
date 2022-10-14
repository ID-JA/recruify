namespace FastRecruiter.Application.Job
{
    public class ExperienceDto
    {
        public string Position { get; set; }

        public string Company { get; set; }

        public bool StillWorking { get; set; }

        public int StartYear { get; set; }

        public string StartMonth { get; set; }

        public int? EndYear { get; set; }

        public string? EndMonth { get; set; }

        public string? Description { get; set; }

    }
}
