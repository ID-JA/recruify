using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class GetJobsRequest : IRequest<List<JobDto>>
    {
        public string IdentityId { get; set; }

        public GetJobsRequest(string identityId) => IdentityId = identityId;
    }

    public class GetJobsRequestHandler : IRequestHandler<GetJobsRequest, List<JobDto>>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IReadRepository<Employer> _employerRepository;

        public GetJobsRequestHandler(IReadRepository<JobEntity> jobRepository, ICurrentUser currentUser, IReadRepository<Employer> employerRepository)
        {
            _jobRepository = jobRepository;
            _currentUser = currentUser;
            _employerRepository = employerRepository;
        }

        public async Task<List<JobDto>> Handle(GetJobsRequest request, CancellationToken cancellationToken)
        {

            var employerSpec = new EmployerSpec(request.IdentityId);

            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);

            if (employer is null)
            {
                throw new NotFoundException("Employer Not Found.");
            }

            var jobsSpec = new JobsByEmployerSpec(employer.Id);

            var jobs = await _jobRepository.ListAsync(jobsSpec);

            return jobs;
        }
    }
}
