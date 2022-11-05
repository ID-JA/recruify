using Mapster;

namespace FastRecruiter.Application.Identity.Users
{
    public class UserDetailsDto
    {
        public Guid Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public bool EmailConfirmed { get; set; }

        public string? PhoneNumber { get; set; }

        public string? ImageUrl { get; set; }

        public string Position { get; set; }

        public string CompanyName { get; set; }


        //public static TypeAdapterConfig GetMapsterConfig()
        //{
        //     var config = new TypeAdapterConfig();
        //    config.NewConfig<JobEntity, JobDto>()
        //        .Map(dest => dest.CompanyName, src => src.Employer.CompanyName)
        //        .Map(dest => dest.Status, src => (int)src.Status)
        //        .Map(dest => dest.CandidatesCount, src => src.TotalApplicants());
        //}
    }
}
