using System.Collections.ObjectModel;

namespace Recruify.Application.Common.Security;


public static class AppAction
{
    public const string Write = nameof(Write);
    public const string Read = nameof(Read);
    public const string Remove = nameof(Remove);
}

public static class AppResource
{
    public const string Company = nameof(Company);
}

public static class AppPermissions
{
    private static readonly AppPermission[] AllPermissions =
    [
        new("Update Company", AppAction.Write, AppResource.Company)
    ];

    public static IReadOnlyList<AppPermission> Owner { get; } = new ReadOnlyCollection<AppPermission>(AllPermissions);
}

public record AppPermission(string Description, string Action, string Resource)
{
    public string Name => NameFor(Action, Resource);

    private static string NameFor(string action, string resource)
    {
        return $"Permissions.{resource}.{action}";
    }
}

