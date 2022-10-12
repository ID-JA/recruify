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

        public static TypeAdapterConfig GetMapsterConfig()
        {
            var config = new TypeAdapterConfig();
            config.NewConfig<JobEntity, OfferDto>()
                .Map(dest => dest.Id, src => src.Id)
                .Map(dest => dest.Title, src => src.Title)
                .Map(dest => dest.Location, src => src.Location)
                .Map(dest => dest.CompanyName, src => src.Employer.CompanyName)
                .Map(des => des.Description, src => src.Description)
                .Map(des => des.Address, src => src.Address)
                .Map(des => des.EmploymentType, src => src.EmploymentType)
                .Map(des => des.Skills, src => src.Skills)
                .Map(des => des.WhyUs, src => src.WhyUs)
                .Map(des => des.CompanyDescription, src => src.CompanyDescription);
            return config;
        }
    }
}
