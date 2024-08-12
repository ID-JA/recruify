using System.Collections.ObjectModel;

namespace FastRecruiter.Api.Auth.Policy;

public static class AppAction
{
    public const string Update = nameof(Update);
}

public static class AppResource
{
    public const string Company = nameof(Company);
}

public static class AppPermissions
{
    private static readonly AppPermission[] allPermissions =
    {     
        // Company Settings
        new("Update Company", AppAction.Update, AppResource.Company),
    };

    public static IReadOnlyList<AppPermission> Admin { get; } = new ReadOnlyCollection<AppPermission>(allPermissions);
    public static IReadOnlyList<AppPermission> Member { get; } = new ReadOnlyCollection<AppPermission>(allPermissions.Where(p => p.IsBasic).ToArray());
}

public record AppPermission(string Description, string Action, string Resource, bool IsBasic = false, bool IsRoot = false)
{
    public string Name => NameFor(Action, Resource);
    public static string NameFor(string action, string resource)
    {
        return $"Permissions.{resource}.{action}";
    }
}
