using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class UpdateJobStatus : IRequest<string>
    {
        public string JobId { get; set; } = default!;
        public string Status { get; set; } = default!;

        public UpdateJobStatus(string jobId, string status)
        {
            JobId = jobId;
            Status = status;
        }
    }


    public class UpdateJobStatusHandler : IRequestHandler<UpdateJobStatus, string>
    {
        private readonly IRepository<JobEntity> _jobRepository;
        private readonly IReadRepository<Employer> _employerRepository;
        private readonly ICurrentUser _currentUser;

        public UpdateJobStatusHandler(IRepository<JobEntity> jobRepository, IReadRepository<Employer> employerRepository, ICurrentUser currentUser)
        {
            _jobRepository = jobRepository;
            _employerRepository = employerRepository;
            _currentUser = currentUser;
        }

        public async Task<string> Handle(UpdateJobStatus request, CancellationToken cancellationToken)
        {
            var employerSpec = new EmployerByAuthIdSpec(_currentUser.GetUserId());
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);

            var offerSpec = new OfferByIdSpec(request.JobId, employer!.Id);
            var offer = await _jobRepository.FirstOrDefaultAsync(offerSpec, cancellationToken);
            _ = offer ?? throw new NotFoundException("this job no more exists");


            switch (request.Status)
            {
                case "draft":
                    offer.DraftJob();
                    await _jobRepository.UpdateAsync(offer);
                    return "Job offer has been drafted successfully";

                case "publish":
                    offer.PublishJob();
                    await _jobRepository.UpdateAsync(offer);
                    return "Job offer has been published successfully";

                case "close":
                    offer.CloseJob();
                    await _jobRepository.UpdateAsync(offer);
                    return "Job offer has been closed successfully";

                default:
                    throw new ArgumentException("Invalid status");
            }

        }
    }
}
