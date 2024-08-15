using FastRecruiter.Api.Data;
using FastRecruiter.Api.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace FastRecruiter.Api.Extensions;

public static class ConfigureDatabaseExtension
{
    public static IServiceCollection ConfigureDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration["ConnectionStrings:DefaultConnection"]));
        services.AddScoped<IDatabaseInitializer, DatabaseInitializer>();

        return services;
    }
    private static IApplicationBuilder SetupDatabases(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var initializers = scope.ServiceProvider.GetServices<IDatabaseInitializer>();
        foreach (var initializer in initializers)
        {
            initializer.SeedAsync(CancellationToken.None).Wait();
        }
        return app;
    }

    public static WebApplication UseDatabaseSeeder(this WebApplication app)
    {
        ArgumentNullException.ThrowIfNull(app);
        app.SetupDatabases();
        return app;
    }
}
