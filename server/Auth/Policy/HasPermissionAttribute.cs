using Microsoft.AspNetCore.Authorization;

namespace FastRecruiter.Api.Auth.Policy;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class HasPermissionAttribute(string requiredPermission) : AuthorizeAttribute(requiredPermission)
{
}
