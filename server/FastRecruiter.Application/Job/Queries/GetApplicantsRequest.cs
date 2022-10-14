using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using Mapster;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Queries
{
    public class GetApplicantsRequest : IRequest<IEnumerable<ApplicantDto>>
    {
        public string JobId { get; set; }

        public GetApplicantsRequest(string jobId)
        {
            JobId = jobId;
        }
    }

    public class GetApplicantsRequestHandler : IRequestHandler<GetApplicantsRequest, IEnumerable<ApplicantDto>>
    {
        private readonly IReadRepository<JobEntity> _repository;
        private readonly IReadRepository<Employer> _employerRepository;
        private readonly ICurrentUser _currentUser;
        public GetApplicantsRequestHandler(IReadRepository<JobEntity> repository, IReadRepository<Employer> employerRepository, ICurrentUser currentUser)
        {
            _repository = repository;
            _employerRepository = employerRepository;
            _currentUser = currentUser;
        }

        public async Task<IEnumerable<ApplicantDto>> Handle(GetApplicantsRequest request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.GetUserId();
            var employerSpec = new EmployerByAuthIdSpec(userId);
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec, cancellationToken);

            var jobSpec = new JobByIdWithApplicantsSpec(request.JobId, employer!.Id);
            var applicants = await _repository.ListAsync(jobSpec, cancellationToken);

            return applicants.Adapt<IEnumerable<ApplicantDto>>(ApplicantDto.MapsterConfig());
        }
    }

}
