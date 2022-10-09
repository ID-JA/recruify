using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Infrasructure.Auth.Jwt;
using FastRecruiter.Infrasructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FastRecruiter.Infrasructure.Auth
{
    internal static class Startup
    {
        internal static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration config)
        {
            services
                .AddCurrentUser()
                .AddAppIdentity();

            services.Configure<SecuritySettings>(config.GetSection(nameof(SecuritySettings)));

            return services.AddJwtAuth(config);
        }


        internal static IApplicationBuilder UseCurrentUser(this IApplicationBuilder app) =>
        app.UseMiddleware<CurrentUserMiddleware>();

        private static IServiceCollection AddCurrentUser(this IServiceCollection services) =>
       services
           .AddScoped<CurrentUserMiddleware>()
           .AddScoped<ICurrentUser, CurrentUser>()
           .AddScoped(sp => (ICurrentUserInitializer)sp.GetRequiredService<ICurrentUser>());
    }
}
