using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Enums;
using Mapster;
using MediatR;
using JobEnity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class GetJobOfferRequest : IRequest<OfferDto>
    {
        public string JobId { get; set; }

        public GetJobOfferRequest(string jobId)
        {
            JobId = jobId;
        }
    }

    public class GetJobOfferRequestHandler : IRequestHandler<GetJobOfferRequest, OfferDto>
    {
        private readonly IReadRepository<JobEnity> _repository;
        public GetJobOfferRequestHandler(IReadRepository<JobEnity> repository)
        {
            _repository = repository;
        }

        public async Task<OfferDto> Handle(GetJobOfferRequest request, CancellationToken cancellationToken)
        {
            var offerSpec = new OfferByIdSpec(request.JobId);
            var offer = await _repository.FirstOrDefaultAsync(offerSpec, cancellationToken);

            if (offer is null || offer.Status == Status.Closed || offer.Status == Status.Draft)
                throw new NotFoundException("this job no more exists");

            return offer.Adapt<OfferDto>(OfferDto.GetMapsterConfig());
        }
    }
}
