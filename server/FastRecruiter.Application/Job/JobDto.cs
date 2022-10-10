using FastRecruiter.Domain.Entities;

namespace FastRecruiter.Application.Job
{
    public class JobDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Skills { get; set; }
        public ICollection<Applicant> Applicants { get; set; }
    }
}
