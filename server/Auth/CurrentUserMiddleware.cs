using FastRecruiter.Api.Identity.Users;

namespace FastRecruiter.Api.Auth;

public class CurrentUserMiddleware(ICurrentUserInitializer _currentUserInitializer) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        _currentUserInitializer.SetCurrentUser(context.User);
        await next(context);
    }
}
