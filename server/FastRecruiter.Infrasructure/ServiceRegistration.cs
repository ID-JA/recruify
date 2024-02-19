using Asp.Versioning;
using FastRecruiter.Infrasructure.Auth;
using FastRecruiter.Infrasructure.Common;
using FastRecruiter.Infrasructure.Cors;
using FastRecruiter.Infrasructure.Mailing;
using FastRecruiter.Infrasructure.Middleware;
using FastRecruiter.Infrasructure.OpenApi;
using FastRecruiter.Infrasructure.Persistence;
using Microsoft.AspNetCore.Builder;
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
                .AddCorsPolicy(configuration)
                .AddExceptionMiddleware()
                .AddMailing(configuration)
                .AddMediatR(opt =>
                {
                    opt.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
                })
                .AddOpenApiDocumentation(configuration)
                .AddPersistence(configuration)
                .AddRouting(options => options.LowercaseUrls = true)
                .AddServices();

            return services;
        }

        private static IServiceCollection AddApiVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(options =>
             {
                 options.DefaultApiVersion = new ApiVersion(1);
                 options.ReportApiVersions = true;
                 options.AssumeDefaultVersionWhenUnspecified = true;
                 options.ApiVersionReader = ApiVersionReader.Combine(
                     new UrlSegmentApiVersionReader(),
                     new HeaderApiVersionReader("X-Api-Version"));
             }).AddApiExplorer(options =>
             {
                 options.GroupNameFormat = "'v'V";
                 options.SubstituteApiVersionInUrl = true;
             });

            return services;
        }


        public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder builder, IConfiguration config) =>
       builder
           .UseRequestLocalization()
           .UseStaticFiles()
           .UseExceptionMiddleware()
           .UseRouting()
           .UseCorsPolicy()
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
