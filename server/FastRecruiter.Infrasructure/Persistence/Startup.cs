using FastRecruiter.Infrasructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FastRecruiter.Infrasructure.Persistence
{
    internal static class Startup
    {
        internal static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            var databaseSettings = configuration.GetSection(nameof(DatabaseSettings)).Get<DatabaseSettings>();
            string? rootConnectionString = databaseSettings.ConnectionString;

            if (string.IsNullOrEmpty(rootConnectionString))
            {
                throw new InvalidOperationException("DB ConnectionString is not configured.");
            }

            string? dbProvider = databaseSettings.DBProvider;
            if (string.IsNullOrEmpty(dbProvider))
            {
                throw new InvalidOperationException("DB Provider is not configured.");
            }

            services
           .Configure<DatabaseSettings>(configuration.GetSection(nameof(DatabaseSettings)))
           .AddDbContext<ApplicationDbContext>(m => m.UseDatabase(dbProvider, rootConnectionString));
            return services;
        }

        internal static DbContextOptionsBuilder UseDatabase(this DbContextOptionsBuilder builder, string dbProvider, string connectionString)
        {
            switch (dbProvider.ToLowerInvariant())
            {

                case "mssql":
                    return builder.UseSqlServer(connectionString, e =>
                        e.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName));
                default:
                    throw new InvalidOperationException($"DB Provider {dbProvider} is not supported.");
            }
        }

    }
}
