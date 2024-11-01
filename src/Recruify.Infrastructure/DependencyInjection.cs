using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Recruify.Infrastructure.Data;
using Recruify.Application.Common.Interfaces;
using Recruify.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Recruify.Domain.Common;
using Ardalis.Specification;
using Microsoft.AspNetCore.Authentication;
using Recruify.Application.Common.Mailing;
using Recruify.Infrastructure.Mailing;
using Recruify.Infrastructure.Auth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

namespace Recruify.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddDbContext<RecruifyDbContext>(options => options.UseSqlServer(config["ConnectionStrings:DefaultConnection"]));

        services.AddOptions<MailSettings>().BindConfiguration(nameof(MailSettings));
        services.AddOptions<JwtOptions>().BindConfiguration(nameof(JwtOptions));

        RegisterAuthIdentity(services, config);
        RegisterEF(services);
        RegisterServices(services);

        return services;
    }

    private static void RegisterAuthIdentity(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IConfigureOptions<JwtBearerOptions>, ConfigureJwtBearerOptions>();
        services
            .AddAuthentication(authentication =>
            {
                authentication.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authentication.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, null!)
            .AddGoogle(options =>
            {
                options.ClientId = configuration["Authentication:Google:ClientId"]!;
                options.ClientSecret = configuration["Authentication:Google:ClientSecret"]!;
                options.ClaimActions.MapJsonKey("picture", "picture");
            });
        services.AddAuthorizationBuilder();
        services.AddAuthorization();

        services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
            .AddEntityFrameworkStores<RecruifyDbContext>()
            .AddDefaultTokenProviders();
    }

    private static void RegisterEF(IServiceCollection services)
    {
        services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
        services.AddScoped(typeof(IReadRepositoryBase<>), typeof(EfRepository<>));
    }

    private static void RegisterServices(IServiceCollection services)
    {
        services.AddScoped<IIdentityService, IdentityService>();
        services.AddTransient<IMailService, EmailSerivce>();
        services.AddScoped<CurrentUserMiddleware>();
        services.AddScoped<ICurrentUser, CurrentUser>();
        services.AddScoped(sp => (ICurrentUserInitializer)sp.GetRequiredService<ICurrentUser>());
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseMiddleware<CurrentUserMiddleware>();
        app.MapControllers();
        return app;
    }
}
