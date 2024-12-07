using ErrorOr;
using Recruify.Application.Common.Interfaces;
using Recruify.Application.Common.Security;
using Recruify.Domain.Common;
using Recruify.Domain.Companies;
using Recruify.Domain.Enums;
using Recruify.Domain.Recruiters;

namespace Recruify.Application.Companies.Commands;

public record CreateCompanyCommand(string CompanyName, string Industry, string Size) : ICommand<ErrorOr<Guid>>;

public class CreateCompanyCommandHandler(
    IRepository<Company> companyRepository,
    IRecruiterService recruiterService)
    : ICommandHandler<CreateCompanyCommand, ErrorOr<Guid>>
{
    public async Task<ErrorOr<Guid>> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
    {
        var recruiter = (await recruiterService.GetCurrentRecruiterAsync(cancellationToken)).Value;

        if (recruiter.CompanyId is not null) return Error.Validation(description: "Recruiter already has a company.");

        var newCompany = new Company(request.CompanyName, request.Industry, request.Size);
        await companyRepository.AddAsync(newCompany, cancellationToken);

        recruiter.AssignToCompany(newCompany, Role.Owner);

        // add permissions for recruiter
        foreach (var permission in AppPermissions.Owner)
        {
            recruiter.AddPermission(new RecruiterPermission(recruiter.Id, permission.Name, isAllowed: true, newCompany.Id));
        }

        await recruiterService.UpdateAsync(recruiter, cancellationToken);

        return newCompany.Id;

    }
}