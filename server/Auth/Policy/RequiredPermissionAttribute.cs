namespace FastRecruiter.Api.Auth.Policy;

public interface IRequiredPermissionMetadata
{
    HashSet<string> RequiredPermissions { get; }
}

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequiredPermissionAttribute(string requiredPermission, params string[] additionalRequiredPermissions)
    : Attribute, IRequiredPermissionMetadata
{
    public HashSet<string> RequiredPermissions { get; } = [requiredPermission, .. additionalRequiredPermissions];
}
