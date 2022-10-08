using FastRecruiter.Application.Identity.Users;
using FastRecruiter.Infrasructure.Auth;
using FastRecruiter.Infrasructure.Identity;
using FastRecruiter.Infrasructure.OpenApi;
using FastRecruiter.Infrasructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace FastRecruiter.Infrasructure
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddInfrasructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IUserService, UserService>();
            return services
                .AddApiVersioning()
                .AddAuth(configuration)
                .AddOpenApiDocumentation(configuration)
                .AddPersistence(configuration);
        }

        private static IServiceCollection AddApiVersioning(this IServiceCollection services) =>
       services.AddApiVersioning(config =>
       {
           config.DefaultApiVersion = new ApiVersion(1, 0);
           config.AssumeDefaultVersionWhenUnspecified = true;
           config.ReportApiVersions = true;
       });

        public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder builder, IConfiguration config) =>
       builder
           .UseRequestLocalization()
           .UseStaticFiles()
           .UseRouting()
           .UseAuthentication()
           .UseAuthorization()
        .UseOpenApiDocumentation(config);

        public static IEndpointRouteBuilder MapEndpoints(this IEndpointRouteBuilder builder)
        {
            builder.MapControllers().RequireAuthorization();
            return builder;
        }

    }


}
