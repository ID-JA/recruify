using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using FastRecruiter.Domain.Enums;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class PublishJobOfferRequest : IRequest<string>
    {
        public string JobId { get; set; } = default!;

    }

    public class PublishJobRequestHandler : IRequestHandler<PublishJobOfferRequest, string>
    {
        private readonly IRepository<JobEntity> _jobRepository;
        private readonly IReadRepository<Employer> _employerRepository;
        private readonly ICurrentUser _currentUser;
        public PublishJobRequestHandler(IRepository<JobEntity> jobRepository, IReadRepository<Employer> employerRepository, ICurrentUser currentUser)
        {
            _jobRepository = jobRepository;
            _employerRepository = employerRepository;
            _currentUser = currentUser;
        }
        public async Task<string> Handle(PublishJobOfferRequest request, CancellationToken cancellationToken)
        {

            var employerSpec = new EmployerByAuthIdSpec(_currentUser.GetUserId());
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);

            var offerSpec = new OfferByIdSpec(request.JobId, employer!.Id);
            var offer = await _jobRepository.FirstOrDefaultAsync(offerSpec, cancellationToken);
            _ = offer ?? throw new NotFoundException("this job no more exists");

            // change status from draft to published
            if (offer.Status == Status.Published)
                return "This job is already published.";

            offer.PublishJob();
            await _jobRepository.UpdateAsync(offer);
            return "Job offer has been published successfully";
        }
    }
}
