using FastRecruiter.Domain.Enums;
using Mapster;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class JobDetailsDto
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Address { get; set; }

        public string Location { get; set; }

        public string EmploymentType { get; set; }

        public string Description { get; set; }

        public string Skills { get; set; }

        public string WhyUs { get; set; }

        public string CompanyDescription { get; set; }

        public Status Status { get; set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime UpdatedAt { get; private set; }
        //public ICollection<Applicant> Applicants { get; set; }

        public static TypeAdapterConfig MapConfig()
        {
            var config = new TypeAdapterConfig();

            config.NewConfig<JobEntity, JobDetailsDto>()
                .Map(dest => dest.Id, src => src.Id)
                .Map(dest => dest.Title, src => src.Title)
                .Map(dest => dest.Location, src => src.Location)
                .Map(dest => dest.Address, src => src.Address)
                .Map(dest => dest.Skills, src => src.Skills)
                .Map(dest => dest.Status, src => src.Status)
                .Map(dest => dest.Description, src => src.Description)
                .Map(dest => dest.CompanyDescription, src => src.CompanyDescription)
                .Map(dest => dest.WhyUs, src => src.WhyUs)
                .Map(dest => dest.CreatedAt, src => src.CreatedAt)
                .Map(dest => dest.UpdatedAt, src => src.UpdatedAt);

            return config;
        }
    }
}
