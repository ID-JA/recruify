using ErrorOr;
using Recruify.Domain.Common;
using Recruify.Domain.Companies;
using Recruify.Domain.Recruiters;

namespace Recruify.Application.Companies.Commands;

public record CreateCompanyCommand : ICommand<ErrorOr<Guid>>
{
    public required string RecruiterId { get; init; }
    public required string CompanyName { get; init; }
    public required string Industry { get; init; }
    public required string Size { get; init; }
}

public class CreateCompanyCommandHandler : ICommandHandler<CreateCompanyCommand, ErrorOr<Guid>>
{
    private readonly IRepository<Company> _companyRepository;
    private readonly IRepository<Recruiter> _recruiterRepository;

    public CreateCompanyCommandHandler(IRepository<Company> companyRepository, IRepository<Recruiter> recruiterRepository)
    {
        _companyRepository = companyRepository;
        _recruiterRepository = recruiterRepository;
    }

    public Task<ErrorOr<Guid>> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
    {
        // TODO: create a company 
        // Assign user to company
        throw new NotImplementedException();
    }
}