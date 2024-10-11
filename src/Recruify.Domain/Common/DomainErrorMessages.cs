namespace Recruify.Domain.Common;

public static class DomainErrorMessages
{
    public const string InviteAlreadySent = "Invite has already been sent to this email.";
    public const string InviteExpired = "Cannot add an expired invite.";
    public const string InviteNotFound = "Invite not found.";
    public const string PrimaryLocationAlreadyExists = "A company can only have one primary location.";
    public const string LocationNotFound = "Location not found.";
    public const string CannotRemovePrimaryLocation = "Cannot remove the primary location without first setting another location as primary.";
}
