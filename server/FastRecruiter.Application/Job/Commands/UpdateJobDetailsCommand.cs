using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Persistence;
using FluentValidation;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Commands
{
    public class UpdateJobDetailsCommand : IRequest<string>
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }
        public string EmploymentType { get; set; }
        public string Description { get; set; }
        public string Skills { get; set; }
        public string WhyUs { get; set; }
        public string CompanyDescription { get; set; }
    }

    public class UpdateJobDetailsCommandValidator : AbstractValidator<UpdateJobDetailsCommand>
    {
        public UpdateJobDetailsCommandValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.EmploymentType).NotEmpty();
            RuleFor(x => x.Skills).NotEmpty();
            RuleFor(x => x.WhyUs).NotEmpty();
            RuleFor(x => x.CompanyDescription).NotEmpty();
        }
    }

    public class UpdateJobDetailsCommandHandler : IRequestHandler<UpdateJobDetailsCommand, string>
    {
        private readonly IRepository<JobEntity> _jobRepository;

        public UpdateJobDetailsCommandHandler(IRepository<JobEntity> jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<string> Handle(UpdateJobDetailsCommand request, CancellationToken cancellationToken)
        {
            var job = await _jobRepository.GetByIdAsync(request.Id);

            if (job == null)
                throw new NotFoundException("Job not found");

            job.UpdateJob(request.Title, request.Location, request.Address, request.EmploymentType, request.Description, request.WhyUs, request.CompanyDescription, request.Skills);

            await _jobRepository.UpdateAsync(job);

            return $"job with id: {job.Id} has been updated successfully";
        }
    }
}
