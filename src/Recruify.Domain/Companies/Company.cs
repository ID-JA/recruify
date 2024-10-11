using Ardalis.GuardClauses;
using ErrorOr;
using Recruify.Domain.Common;
using Recruify.Domain.Companies.Events;
using Recruify.Domain.Recruiters;

namespace Recruify.Domain.Companies;

public class Company : EntityBase<Guid>, IAggregateRoot
{
    public string Name { get; private set; }
    public string Industry { get; private set; }
    public string Size { get; private set; }

    private readonly List<CompanyInvite> _invites = [];
    private readonly List<CompanyLocation> _locations = [];
    private readonly List<Recruiter> _recruiters = [];

    public IEnumerable<CompanyInvite> Invites => _invites.AsReadOnly();
    public IEnumerable<CompanyLocation> Locations => _locations.AsReadOnly();
    public IEnumerable<Recruiter> Recruiters => _recruiters.AsReadOnly();

    public Company(Guid id, string name, string industry, string size)
    {
        Id = id;
        Name = name;
        Industry = industry;
        Size = size;
    }

    public ErrorOr<Success> AddInvite(CompanyInvite invite)
    {
        if (_invites.Exists(i => i.Email == invite.Email))
        {
            return Error.Failure(DomainErrorMessages.InviteAlreadySent);
        }

        if (invite.IsExpired())
        {
            return Error.Failure(DomainErrorMessages.InviteExpired);
        }

        _invites.Add(invite);
        var newInviteCreated = new NewInviteAddedEvent(this, invite);
        base.RegisterDomainEvent(newInviteCreated);

        return Result.Success;
    }

    public ErrorOr<Success> CancelInvite(Guid inviteId)
    {
        var invite = _invites.FirstOrDefault(i => i.Id == inviteId);
        if (invite is null)
        {
            return Error.NotFound(DomainErrorMessages.InviteNotFound);
        }

        _invites.Remove(invite);
        return Result.Success;
    }

    public ErrorOr<Success> AddLocation(CompanyLocation location)
    {
        if (location.IsPrimaryLocation && _locations.Any(l => l.IsPrimaryLocation))
        {
            return Error.Failure(DomainErrorMessages.PrimaryLocationAlreadyExists);
        }

        _locations.Add(location);
        return Result.Success;
    }

    public ErrorOr<Success> RemoveLocation(Guid locationId)
    {
        var location = _locations.FirstOrDefault(l => l.Id == locationId);

        if (location is null)
        {
            return Error.NotFound(DomainErrorMessages.LocationNotFound);
        }

        if (location.IsPrimaryLocation || _locations.Count == 1)
        {
            return Error.Conflict(DomainErrorMessages.CannotRemovePrimaryLocation);
        }

        _locations.Remove(location);
        return Result.Success;
    }

    public void UpdateInfo(string newName, string newIndustry, string newSize)
    {
        Name = Guard.Against.NullOrEmpty(newName, nameof(newName));
        Industry = Guard.Against.NullOrEmpty(newIndustry, nameof(newIndustry));
        Size = Guard.Against.NullOrEmpty(newSize, nameof(newSize));
    }

    public ErrorOr<Success> SetPrimaryLocation(Guid locationId)
    {
        var currentPrimary = _locations.FirstOrDefault(l => l.IsPrimaryLocation);

        currentPrimary?.MarkAsNonPrimary();

        var newPrimary = _locations.FirstOrDefault(l => l.Id == locationId);
        if (newPrimary is null)
        {
            return Error.NotFound(DomainErrorMessages.LocationNotFound);
        }
        newPrimary.MarkAsPrimary();
        return Result.Success;
    }
}

