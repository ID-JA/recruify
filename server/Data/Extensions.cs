namespace FastRecruiter.Api.Data;

public static class Extensions
{
    private static IApplicationBuilder SetupDatabases(this IApplicationBuilder app)
    {
        // create a scope for tenant
        using var scope = app.ApplicationServices.CreateScope();

        // using the scope, perform migrations / seeding
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
