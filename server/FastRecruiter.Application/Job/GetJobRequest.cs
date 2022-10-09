using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class GetJobRequest : IRequest<JobOfferDto>
    {
        public string Id { get; set; }
        public GetJobRequest(string id)
        {
            Id = id;
        }
    }

    public class GetJobRequestHandler : IRequestHandler<GetJobRequest, JobOfferDto>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;

        public GetJobRequestHandler(IReadRepository<JobEntity> jobRepository) => _jobRepository = jobRepository;

        public async Task<JobOfferDto> Handle(GetJobRequest request, CancellationToken cancellationToken)
        {
            var job = await _jobRepository.FirstOrDefaultAsync(new JobSpec(request.Id));

            if (job is null)
                throw new NotFoundException("this job offer doesn't exists");

            return job;
        }
    }

}
