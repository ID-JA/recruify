using Microsoft.AspNetCore.Http;
using Recruify.Application.Common.Interfaces;

namespace Recruify.Infrastructure.Auth;

public class CurrentUserMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context, ICurrentUserInitializer currentUserInitializer)
    {
        currentUserInitializer.SetCurrentUser(context.User);
        await next(context);
    }
}
