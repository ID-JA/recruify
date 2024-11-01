using Microsoft.AspNetCore.Http;
using Recruify.Application.Common.Interfaces;

namespace Recruify.Infrastructure.Auth;

public class CurrentUserMiddleware(ICurrentUserInitializer _currentUserInitializer) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        _currentUserInitializer.SetCurrentUser(context.User);
        await next(context);
    }
}
