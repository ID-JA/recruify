using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using Mapster;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Queries
{
    public class GetJobListQuery : IRequest<IEnumerable<JobDto>>
    {
        public string UserId { get; set; }
        public GetJobListQuery(string userId)
        {
            UserId = userId;
        }
    }

    public class GetJobsQueryHandler : IRequestHandler<GetJobListQuery, IEnumerable<JobDto>>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;
        private readonly IReadRepository<Employer> _employerRepository;

        public GetJobsQueryHandler(IReadRepository<JobEntity> jobRepository, IReadRepository<Employer> employerRepository)
        {
            _jobRepository = jobRepository;
            _employerRepository = employerRepository;
        }

        public async Task<IEnumerable<JobDto>> Handle(GetJobListQuery request, CancellationToken cancellationToken)
        {
            var employerSpec = new EmployerByAuthIdSpec(request.UserId);
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec, cancellationToken);

            var jobsSpec = new EmployerJobsSpec(employer!.Id);
            var jobs = await _jobRepository.ListAsync(jobsSpec, cancellationToken);

            return jobs.Adapt<IEnumerable<JobDto>>(JobDto.GetMapsterConfig());
        }
    }
}
