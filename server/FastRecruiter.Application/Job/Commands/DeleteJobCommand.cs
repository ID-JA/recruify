using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Commands
{
    public class DeleteJobCommand : IRequest<string>
    {
        public string JobId { get; set; }
        public DeleteJobCommand(string jobId)
        {
            JobId = jobId;
        }
    }


    public class DeleteJobCommandHandler : IRequestHandler<DeleteJobCommand, string>
    {
        private readonly IReadRepository<Employer> _employerRepository;
        private readonly IRepository<JobEntity> _jobRepository;
        private readonly ICurrentUser _currentUser;

        public DeleteJobCommandHandler(IReadRepository<Employer> employerRepository, IRepository<JobEntity> jobRepository, ICurrentUser currentUser)
        {
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _currentUser = currentUser;
        }

        public async Task<string> Handle(DeleteJobCommand request, CancellationToken cancellationToken)
        {
            var employerSpec = new EmployerByAuthIdSpec(_currentUser.GetUserId());
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);

            var jobSpec = new OfferByIdSpec(request.JobId, employer!.Id);
            var job = await _jobRepository.FirstOrDefaultAsync(jobSpec);
            _ = job ?? throw new NotFoundException("Job not found");

            await _jobRepository.DeleteAsync(job);

            return job.Id;
        }
    }
}
