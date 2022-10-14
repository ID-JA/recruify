using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using Mapster;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Queries
{
    public class GetJobRequest : IRequest<JobDetailsDto>
    {
        public string JobId { get; set; } = default!;

        public GetJobRequest(string jobId)
        {
            JobId = jobId;
        }
    }

    public class GetJobRequestHandler : IRequestHandler<GetJobRequest, JobDetailsDto>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;
        private readonly IReadRepository<Employer> _employerRepository;
        private readonly ICurrentUser _currentUser;

        public GetJobRequestHandler(IReadRepository<JobEntity> jobRepository, IReadRepository<Employer> employerRepository, ICurrentUser currentUser)
        {
            _jobRepository = jobRepository;
            _employerRepository = employerRepository;
            _currentUser = currentUser;
        }

        public async Task<JobDetailsDto> Handle(GetJobRequest request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.GetUserId();
            var employerSpec = new EmployerByAuthIdSpec(userId);
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);

            var jobSpec = new OfferByIdSpec(request.JobId, employer!.Id);
            var job = await _jobRepository.FirstOrDefaultAsync(jobSpec, cancellationToken);


            return job!.Adapt<JobDetailsDto>(JobDetailsDto.MapConfig());
        }
    }
}
