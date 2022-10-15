using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Enums;
using Mapster;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Queries
{
    /// <summary>
    /// this query is for candidates
    /// </summary>
    public class GetOfferQuery : IRequest<OfferDto>
    {
        public string JobId { get; set; } = default!;

        public GetOfferQuery(string jobId)
        {
            JobId = jobId;
        }
    }

    public class GetJobOfferHandler : IRequestHandler<GetOfferQuery, OfferDto>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;

        public GetJobOfferHandler(IReadRepository<JobEntity> jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<OfferDto> Handle(GetOfferQuery request, CancellationToken cancellationToken)
        {
            var offerSpec = new OfferByIdSpec(request.JobId);

            var offer = await _jobRepository.FirstOrDefaultAsync(offerSpec);

            if (offer is null || offer.Status == Status.Draft || offer.Status == Status.Closed)
                throw new NotFoundException("this job no more exists");

            return offer.Adapt<JobEntity, OfferDto>(OfferDto.GetMapsterConfig());
        }
    }
}
