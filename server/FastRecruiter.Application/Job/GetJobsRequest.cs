using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using Mapster;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;
namespace FastRecruiter.Application.Job
{
    public class GetJobsRequest : IRequest<IEnumerable<JobDto>>
    {
        public string UserId { get; set; }

        public GetJobsRequest(string userId)
        {
            UserId = userId;
        }
    }

    public class GetJobsRequestHandler : IRequestHandler<GetJobsRequest, IEnumerable<JobDto>>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;
        private readonly IReadRepository<Employer> _employerRepository;

        public GetJobsRequestHandler(IReadRepository<JobEntity> jobRepository, IReadRepository<Employer> employerRepository)
        {
            _jobRepository = jobRepository;
            _employerRepository = employerRepository;
        }

        public async Task<IEnumerable<JobDto>> Handle(GetJobsRequest request, CancellationToken cancellationToken)
        {
            var employerSpec = new EmployerByAuthIdSpec(request.UserId);
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);

            var jobsSpec = new EmployerJobsSpec(employer!.Id);
            var jobs = await _jobRepository.ListAsync(jobsSpec, cancellationToken);

            return jobs.Adapt<IEnumerable<JobDto>>(JobDto.GetMapsterConfig());
        }
    }
}
