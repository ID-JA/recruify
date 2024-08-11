using FastRecruiter.Api.Identity;
using FastRecruiter.Api.Services.Users;
using Microsoft.AspNetCore.Authorization;

namespace FastRecruiter.Api.Auth.Policy;

public class PermissionAuthorizationRequirement : IAuthorizationRequirement;

public interface IRequiredPermissionMetadata
{
    HashSet<string> RequiredPermissions { get; }
}

public sealed class HasPermissionAuthorizationHandler(IUserService userService) : AuthorizationHandler<PermissionAuthorizationRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionAuthorizationRequirement requirement)
    {
        var endpoint = context.Resource switch
        {
            HttpContext httpContext => httpContext.GetEndpoint(),
            Endpoint ep => ep,
            _ => null,
        };

        var requiredPermissions = endpoint?.Metadata.GetMetadata<IRequiredPermissionMetadata>()?.RequiredPermissions;
        if (requiredPermissions == null)
        {
            context.Succeed(requirement);
            return;
        }
        if (context.User?.GetUserId() is { } userId && await userService.HasPermissionAsync(userId, requiredPermissions.First()))
        {
            context.Succeed(requirement);
        }
    }
}
