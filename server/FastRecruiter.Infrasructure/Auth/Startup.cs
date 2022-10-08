using FastRecruiter.Infrasructure.Auth.Jwt;
using FastRecruiter.Infrasructure.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FastRecruiter.Infrasructure.Auth
{
    internal static class Startup
    {
        internal static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration config)
        {
            services
                // Must add identity before adding auth!
                .AddAppIdentity();
            services.Configure<SecuritySettings>(config.GetSection(nameof(SecuritySettings)));
            return services.AddJwtAuth(config);
        }
    }
}
