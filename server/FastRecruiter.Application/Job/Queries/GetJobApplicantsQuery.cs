using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using Mapster;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Queries
{
    public class GetJobApplicantsQuery : IRequest<ICollection<ApplicantDto>>
    {
        public string JobId { get; set; }

        public GetJobApplicantsQuery(string jobId)
        {
            JobId = jobId;
        }
    }

    public class GetJobApplicantsQueryHandler : IRequestHandler<GetJobApplicantsQuery, ICollection<ApplicantDto>>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;
        private readonly IReadRepository<Employer> _employerRepository;
        private readonly ICurrentUser _currentUser;
        public GetJobApplicantsQueryHandler(IReadRepository<JobEntity> jobRepository, IReadRepository<Employer> employerRepository, ICurrentUser currentUser)
        {
            _jobRepository = jobRepository;
            _employerRepository = employerRepository;
            _currentUser = currentUser;
        }

        public async Task<ICollection<ApplicantDto>> Handle(GetJobApplicantsQuery request, CancellationToken cancellationToken)
        {
            var employerSpec = new EmployerByAuthIdSpec(_currentUser.GetUserId());
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec, cancellationToken);

            var jobSpec = new JobWithApplicantsById(request.JobId, employer!.Id);
            var job = await _jobRepository.FirstOrDefaultAsync(jobSpec, cancellationToken);

            return job!.Applicants.Adapt<ICollection<ApplicantDto>>();
        }
    }



}
