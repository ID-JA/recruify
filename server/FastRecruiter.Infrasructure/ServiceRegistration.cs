using FastRecruiter.Infrasructure.Auth;
using FastRecruiter.Infrasructure.Common;
using FastRecruiter.Infrasructure.Mailing;
using FastRecruiter.Infrasructure.Middleware;
using FastRecruiter.Infrasructure.OpenApi;
using FastRecruiter.Infrasructure.Persistence;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace FastRecruiter.Infrasructure
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddInfrasructure(this IServiceCollection services, IConfiguration configuration)
        {
            services
               .AddApiVersioning()
                .AddAuth(configuration)
                .AddExceptionMiddleware()
                .AddMailing(configuration)
                .AddMediatR(Assembly.GetExecutingAssembly())
                .AddOpenApiDocumentation(configuration)
                .AddPersistence(configuration)
                .AddRouting(options => options.LowercaseUrls = true)
                .AddServices();

            return services;
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
           .UseExceptionMiddleware()
           .UseRouting()
           .UseAuthentication()
           .UseCurrentUser()
           .UseAuthorization()
           .UseOpenApiDocumentation(config);

        public static IEndpointRouteBuilder MapEndpoints(this IEndpointRouteBuilder builder)
        {
            builder.MapControllers().RequireAuthorization();
            return builder;
        }

    }


}
