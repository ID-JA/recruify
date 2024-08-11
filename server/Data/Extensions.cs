namespace FastRecruiter.Api.Data;

public static class Extensions
{
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
