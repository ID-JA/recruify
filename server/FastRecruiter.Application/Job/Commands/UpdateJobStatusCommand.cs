using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;
namespace FastRecruiter.Application.Job.Commands
{
    public class UpdateJobStatusCommand : IRequest<string>
    {
        public string JobId { get; set; } = default!;
        public string Status { get; set; } = default!;

    }


    public class UpdateJobStatusHandler : IRequestHandler<UpdateJobStatusCommand, string>
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

        public async Task<string> Handle(UpdateJobStatusCommand request, CancellationToken cancellationToken)
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
                case "archive":
                    offer.ArchiveJob();
                    await _jobRepository.UpdateAsync(offer);
                    return "Job offer has been archived successfully";
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
