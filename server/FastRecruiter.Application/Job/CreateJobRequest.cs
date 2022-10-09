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
        public string Title { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string EmploymentType { get; set; }
        public string Skills { get; set; }
        public string WhyUs { get; set; }
        public string CompanyDescription { get; set; }
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
        private readonly IRepository<Employer> _employerRepository;
        private readonly ICurrentUser _currentUser;
        public CreateJobRequestHandler(IRepository<JobEntity> jobRepository, ICurrentUser currentUser, IRepository<Employer> employerRepository)
        {
            _jobRepository = jobRepository;
            _currentUser = currentUser;
            _employerRepository = employerRepository;
        }


        public async Task<string> Handle(CreateJobRequest request, CancellationToken cancellationToken)
        {
            // TODO: 
            // 1. Find Employer Id using Identity User Id
            // 2. Create new Job using repository.AddAsync()
            // 3. Save changes using repository.UnitOfWork.SaveChangesAsync()
            // 4. Return Job Id
            var identityId = _currentUser.GetUserId();

            var employerSpec = new EmployerSpec(identityId);
            var employer = await _employerRepository.FirstOrDefaultAsync(employerSpec);


            var job = JobEntity.CeateJob(employer!.Id, request.Title, request.Location, request.Address, request.EmploymentType, request.Description, request.WhyUs, request.CompanyDescription);

            await _jobRepository.AddAsync(job, cancellationToken);

            return job.Id;
        }
    }
}
