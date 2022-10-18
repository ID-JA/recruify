using FastRecruiter.Application.Common.Interfaces;
using Mapster;
using JobEntity = FastRecruiter.Domain.Entities.Job;
namespace FastRecruiter.Application.Job
{
    public class JobDto : IDto
    {

        public string Id { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string CompanyName { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CandidatesCount { get; set; }
        public int Status { get; set; }

        public static TypeAdapterConfig GetMapsterConfig()
        {
            var config = new TypeAdapterConfig();
            config.NewConfig<JobEntity, JobDto>()
                .Map(dest => dest.CompanyName, src => src.Employer.CompanyName)
                .Map(dest => dest.Status, src => (int)src.Status)
                .Map(dest => dest.CandidatesCount, src => src.TotalApplicants());

            return config;
        }
    }
}
