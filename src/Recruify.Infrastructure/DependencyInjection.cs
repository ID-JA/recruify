using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Recruify.Infrastructure.Data;
using Recruify.Application.Common.Interfaces;
using Recruify.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Recruify.Domain.Common;
using Ardalis.Specification;
using Recruify.Application.Common.Mailing;
using Recruify.Infrastructure.Mailing;

namespace Recruify.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddDbContext<RecruifyDbContext>(options => options.UseSqlServer(config["ConnectionStrings:DefaultConnection"]));

        services.AddOptions<MailSettings>().BindConfiguration(nameof(MailSettings));

        RegisterAuthIdentity(services);
        RegisterEF(services);
        RegisterServices(services);

        return services;
    }

    private static void RegisterAuthIdentity(IServiceCollection services)
    {
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
    }
}
