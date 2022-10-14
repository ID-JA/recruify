using FastRecruiter.Domain.Entities;
using Mapster;

namespace FastRecruiter.Application.Job
{
    public class ApplicantDto
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public bool EmailConfirmation { get; set; }

        public string PhoneNumber { get; set; }

        public IEnumerable<ExperienceDto> Experiences { get; set; }
        public IEnumerable<EducationDto> Educations { get; set; }

        public static TypeAdapterConfig MapsterConfig()
        {
            var config = new TypeAdapterConfig();

            config.NewConfig<Applicant, ApplicantDto>()
                .Map(dest => dest.Id, src => src.Id)
                .Map(d => d.Email, src => src.Email)
                .Map(d => d.Name, s => s.Name)
                .Map(d => d.EmailConfirmation, s => s.EmailConfirmation)
                .Map(d => d.PhoneNumber, s => s.PhoneNumber)
                .Map(d => d.Educations, s => s.Adapt<IEnumerable<EducationDto>>())
                .Map(d => d.Experiences, s => s.Adapt<IEnumerable<ExperienceDto>>());

            return config;
        }

    }
}
