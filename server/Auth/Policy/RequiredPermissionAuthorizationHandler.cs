using FastRecruiter.Api.Identity.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace FastRecruiter.Api.Auth.Policy;

public sealed class RequiredPermissionAuthorizationHandler(IUserService userService) : AuthorizationHandler<PermissionAuthorizationRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionAuthorizationRequirement requirement)
    {
        var endpoint = context.Resource switch
        {
            HttpContext httpContext => httpContext.GetEndpoint(),
            Endpoint ep => ep,
            _ => null,
        };
        var userId = context.User?.GetUserId();
        if (userId is null)
        {
            context.Fail(); 
            return;
        }

        var requiredPermissions = endpoint?.Metadata.GetMetadata<IRequiredPermissionMetadata>()?.RequiredPermissions;
        if (requiredPermissions == null)
        {
            context.Succeed(requirement);
            return;
        }

        if (await userService.HasPermissionAsync(userId, requiredPermissions.First()))
        {
            context.Succeed(requirement);
        }
        else
        {
            context.Fail(); 
        }
    }
}
