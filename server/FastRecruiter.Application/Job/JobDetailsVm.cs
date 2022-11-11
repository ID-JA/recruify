using FastRecruiter.Domain.Enums;

namespace FastRecruiter.Application.Job
{
    public class JobDetailsVm
    {
        public string Title { get; set; }

        public string CompanyName { get; set; }

        public string Address { get; set; }

        public string Location { get; set; }

        public string EmploymentType { get; set; }

        public string Description { get; set; }

        public string Skills { get; set; }

        public string WhyUs { get; set; }

        public string CompanyDescription { get; set; }

        public Status Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
