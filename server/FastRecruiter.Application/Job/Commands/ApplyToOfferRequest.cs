using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Domain.Entities;
using MediatR;

namespace FastRecruiter.Application.Job.Commands
{

    public class ApplyToOfferRequest : IRequest<string>
    {
        public string JobId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public EducationDto Education { get; set; } // should be a list so applicant can add more than one Education
        public ExperienceDto Experience { get; set; } // should be a list so applicant can add more than one Experience

    }





    public class ApplyToOfferRequestHandler : IRequestHandler<ApplyToOfferRequest, string>
    {

        private readonly IRepository<Applicant> _applicantRepository;

        public ApplyToOfferRequestHandler(IRepository<Applicant> applicantRepository)
        {
            _applicantRepository = applicantRepository;
        }

        public async Task<string> Handle(ApplyToOfferRequest request, CancellationToken cancellationToken)
        {

            var applicant = Applicant.CreateApplicant(request.Name, request.Email, request.PhoneNumber, request.JobId);

            var exp = Experience.CreateExperience(request.Experience.Position,
               request.Experience.Company,
               request.Experience.StillWorking,
               request.Experience.StartYear,
               request.Experience.StartMonth,
               request.Experience.EndYear,
               request.Experience.EndMonth,
               request.Experience.Description,
               applicant.Id
               );

            var edu = Education.CreateEducation(request.Education.School,
                request.Education.Degree,
                request.Education.InProgress,
                request.Education.DegreeYear,
                request.Education.Description,
                applicant.Id
                );

            applicant.AddExperience(exp);
            applicant.AddEducation(edu);

            await _applicantRepository.AddAsync(applicant);

            return applicant.Id;
        }
    }
}
