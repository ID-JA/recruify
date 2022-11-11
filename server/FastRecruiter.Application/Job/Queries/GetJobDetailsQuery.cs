using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using Mapster;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Queries
{
    public class GetJobDetailsQuery : IRequest<OfferDto>
    {
        public string JobId { get; set; }
        public string IdentityId { get; set; }

        public GetJobDetailsQuery(string jobId, string identityId)
        {
            JobId = jobId;
            IdentityId = identityId;
        }
    }

    public class GetJobDetailsQueryHandler : IRequestHandler<GetJobDetailsQuery, OfferDto>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;
        private readonly IReadRepository<Employer> _employerRepository;

        public GetJobDetailsQueryHandler(IReadRepository<JobEntity> jobRepository, IReadRepository<Employer> employerRepository)
        {
            _jobRepository = jobRepository;
            _employerRepository = employerRepository;
        }

        public async Task<OfferDto> Handle(GetJobDetailsQuery request, CancellationToken cancellationToken)
        {
            var employerSpec = new EmployerByAuthIdSpec(request.IdentityId);
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);

            var jobSpec = new OfferByIdSpec(request.JobId, employer!.Id);
            var job = await _jobRepository.FirstOrDefaultAsync(jobSpec);

            if (job is null)
                throw new NotFoundException("Job not found");

            var vm = job.Adapt<OfferDto>(OfferDto.GetMapsterConfig());

            return vm;
        }
    }
}
