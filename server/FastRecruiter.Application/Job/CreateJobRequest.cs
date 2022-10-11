using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using FluentValidation;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job
{
    public class CreateJobRequest : IRequest<string>
    {
        public string Title { get; set; } = default!;
        public string Location { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string EmploymentType { get; set; } = default!;
        public string Skills { get; set; } = default!;
        public string WhyUs { get; set; } = default!;
        public string CompanyDescription { get; set; } = default!;
        public int SavaAsDraft { get; set; }
    }

    public class CreateJobRequestValidator : AbstractValidator<CreateJobRequest>
    {
        public CreateJobRequestValidator()
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

    public class CreateJobRequestHandler : IRequestHandler<CreateJobRequest, string>
    {
        private readonly IRepository<JobEntity> _jobRepository;
        private readonly IReadRepository<Employer> _employerRepository;
        private readonly ICurrentUser _currentUser;

        public CreateJobRequestHandler(IRepository<JobEntity> jobRepository, ICurrentUser currentUser, IReadRepository<Employer> employerRepository)
        {
            _jobRepository = jobRepository;
            _currentUser = currentUser;
            _employerRepository = employerRepository;
        }


        public async Task<string> Handle(CreateJobRequest request, CancellationToken cancellationToken)
        {

            var identityId = _currentUser.GetUserId();
            var employerSpec = new EmployerByAuthIdSpec(identityId);
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);


            var job = JobEntity.CreateJob(employer!.Id,
                request.Title,
                request.Location,
                request.Address,
                request.EmploymentType,
                request.Description,
                request.WhyUs,
                request.CompanyDescription,
                request.SavaAsDraft,
                request.Skills
                );

            await _jobRepository.AddAsync(job, cancellationToken);

            return job.Id;
        }
    }
}
