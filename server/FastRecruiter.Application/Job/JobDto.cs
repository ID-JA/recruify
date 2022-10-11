namespace FastRecruiter.Application.Job
{
    public class JobDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string CompanyName { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CandidatesCount { get; set; }
        public int Status { get; set; }
    }
}
