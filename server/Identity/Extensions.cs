using Microsoft.AspNetCore.Identity;
using FastRecruiter.Api.Models;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Auth;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Identity.Tokens;

namespace FastRecruiter.Api.Identity;

public static class Extensions
{
    public static IServiceCollection ConfigureIdentity(this IServiceCollection services)
    {
        services.AddScoped<CurrentUserMiddleware>();
        services.AddScoped(sp => (ICurrentUserInitializer)sp.GetRequiredService<ICurrentUser>());
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<ICurrentUser, CurrentUser>();
        services.AddTransient<IUserService, UserService>();
        services.AddIdentity<User, Role>(options =>
        {
            options.Password.RequiredLength = 8;
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.User.RequireUniqueEmail = true;
        })
         .AddEntityFrameworkStores<ApplicationDbContext>()
         .AddDefaultTokenProviders();
        return services;
    }
}