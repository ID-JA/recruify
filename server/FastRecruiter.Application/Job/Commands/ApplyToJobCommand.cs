using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Domain.Entities;
using MediatR;

namespace FastRecruiter.Application.Job.Commands
{
    public class ApplyToJobCommand : IRequest<string>
    {
        public string JobId { get; set; }
        public ApplicantDto applicant { get; set; }
    }

    public class ApplyToJobCommandHandler : IRequestHandler<ApplyToJobCommand, string>
    {
        private readonly IRepository<Applicant> _applicantRepository;

        public ApplyToJobCommandHandler(IRepository<Applicant> applicantRepository)
        {
            _applicantRepository = applicantRepository;
        }

        public async Task<string> Handle(ApplyToJobCommand request, CancellationToken cancellationToken)
        {
            var applicant = Applicant.CreateApplicant(request.applicant.Name, request.applicant.Email, request.applicant.PhoneNumber, request.JobId);

            foreach (var exp in request.applicant.Experiences)
            {
                var experience = Experience.CreateExperience(exp.Position,
                    exp.Company,
                    exp.StillWorking,
                    exp.StartYear,
                    exp.StartMonth,
                    exp.EndYear,
                    exp.EndMonth,
                    exp.Description,
                    applicant.Id
                );
                applicant.AddExperience(experience);
            }

            foreach (var edu in request.applicant.Educations)
            {
                var education = Education.CreateEducation(edu.School,
                    edu.Degree,
                    edu.InProgress,
                    edu.DegreeYear,
                    edu.Description,
                    applicant.Id
                );
                applicant.AddEducation(education);
            }

            await _applicantRepository.AddAsync(applicant);

            return $"you have been successfully applied to job with id: {request.JobId}";
        }
    }
}
