using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Domain.Entities;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;
namespace FastRecruiter.Application.Job.Commands
{
    public class ApplyToJobCommand : IRequest<string>
    {
        public string jobId { get; set; }
        public ApplicantDto applicant { get; set; }
    }

    public class ApplyToJobCommandHandler : IRequestHandler<ApplyToJobCommand, string>
    {
        private readonly IRepository<Applicant> _applicantRepository;
        private readonly IRepository<JobEntity> _jobRepository;


        public ApplyToJobCommandHandler(IRepository<Applicant> applicantRepository, IRepository<JobEntity> jobRepository)
        {
            _applicantRepository = applicantRepository;
            _jobRepository = jobRepository;
        }

        public async Task<string> Handle(ApplyToJobCommand request, CancellationToken cancellationToken)
        {
            var job = await _jobRepository.GetByIdAsync(request.jobId);
            if (job is null)
            {
                throw new NotFoundException("job not found");
            }

            var applicant = Applicant.CreateApplicant(request.applicant.Name, request.applicant.Email, request.applicant.PhoneNumber, request.jobId);

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

            job.ApplyToJob();

            await _jobRepository.SaveChangesAsync();
            return $"you have been successfully applied to job with id: {request.jobId}";
        }
    }
}
