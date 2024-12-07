using Ardalis.GuardClauses;
using ErrorOr;
using Recruify.Domain.Common;
using Recruify.Domain.Companies;
using Recruify.Domain.Enums;
using Recruify.Domain.Recruiters.Events;

namespace Recruify.Domain.Recruiters;

public class Recruiter : EntityBase<Guid>, IAggregateRoot
{
    public Guid IdentityUserId { get; private set; }
    public Guid? CompanyId { get; private set; }
    public Role? Role { get; private set; }

    private readonly List<RecruiterPermission> _permissions = [];
    public IReadOnlyCollection<RecruiterPermission> Permissions => _permissions.AsReadOnly();

    public Recruiter(Guid identityUserId)
    {
        IdentityUserId = Guard.Against.NullOrEmpty(identityUserId, nameof(identityUserId));
    }

    public void AssignToCompany(Company company, Role role)
    {
        Guard.Against.Null(company, nameof(company));
        Guard.Against.Null(role, nameof(role));

        CompanyId = company.Id;
        Role = role;

        RegisterDomainEvent(new RecruiterAssignedToCompanyEvent(Id, company.Id));
    }

    public ErrorOr<Success> AddPermission(RecruiterPermission permission)
    {
        Guard.Against.Null(permission, nameof(permission));

        if (_permissions.Exists(p => p.Permission == permission.Permission))
        {
            return Error.Conflict("Permission already exists.");
        }

        _permissions.Add(permission);
        return Result.Success;
    }

    public ErrorOr<Success> UpdatePermission(Guid permissionId, bool isAllowed)
    {
        var existingPermission = _permissions.FirstOrDefault(p => p.Id == permissionId);

        if (existingPermission is null)
        {
            return Error.NotFound("Permission not found.");
        }

        existingPermission.UpdatePermission(isAllowed);
        return Result.Success;
    }
}