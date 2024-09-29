using Ardalis.GuardClauses;
using ErrorOr;
using Recruify.Domain.Common;
using Recruify.Domain.Companies.Events;

namespace Recruify.Domain.Companies;

public class Company : EntityBase<Guid>, IAggregateRoot
{
    public string Name { get; private set; }
    public string Industry { get; private set; }
    public string Size { get; private set; }

    private readonly List<CompanyInvite> _invites = [];
    private readonly List<CompanyLocation> _locations = [];

    public IEnumerable<CompanyInvite> Invites => _invites.AsReadOnly();
    public IEnumerable<CompanyLocation> Locations => _locations.AsReadOnly();

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
            return Error.Failure("Invite has already been sent to this email.");
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
            return Error.NotFound("Invite not found.");
        }

        _invites.Remove(invite);
        base.RegisterDomainEvent(new InviteCancelledEvent(this, invite));

        return Result.Success;
    }

    public ErrorOr<Success> AddLocation(CompanyLocation location)
    {
        if (location.IsPrimaryLocation && _locations.Exists(l => l.IsPrimaryLocation))
        {
            return Error.Failure("A company can only have one primary location");
        }

        _locations.Add(location);
        base.RegisterDomainEvent(new NewLocationAddedEvent(this, location));
        return Result.Success;
    }

    public ErrorOr<Success> RemoveLocation(Guid locationId)
    {
        var location = _locations.FirstOrDefault(l => l.Id == locationId);

        if (location is null)
        {
            return Error.NotFound("Location not found.");
        }

        if (location.IsPrimaryLocation || _locations.Count == 1)
        {
            return Error.Conflict("Cannot remove the primary location without first setting another location as primary.");
        }

        _locations.Remove(location);
        base.RegisterDomainEvent(new LocationRemovedEvent(this, location));

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
        if(newPrimary is null)
        {
            return Error.NotFound("Location not found.");
        }
        newPrimary.MarkAsPrimary();

        base.RegisterDomainEvent(new PrimaryLocationChangedEvent(this, newPrimary));

        return Result.Success;
    }

}
