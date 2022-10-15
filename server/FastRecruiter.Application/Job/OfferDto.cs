using FastRecruiter.Domain.Enums;
using Mapster;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class OfferDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string EmploymentType { get; set; }
        public string Skills { get; set; }
        public string WhyUs { get; set; }
        public string CompanyDescription { get; set; }
        public Status Status { get; set; }

        public static TypeAdapterConfig GetMapsterConfig()
        {
            var config = new TypeAdapterConfig();
            config.NewConfig<JobEntity, OfferDto>()
                .Map(dest => dest.CompanyName, src => src.Employer.CompanyName);
            return config;
        }

    }
}
