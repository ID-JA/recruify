using System.Collections.ObjectModel;

namespace Recruify.Application.Common.Security;

public static class AppAction
{
    public const string Update = nameof(Update);
    public const string Create = nameof(Create);
    public const string Delete = nameof(Delete);
    public const string View = nameof(View);
}

public static class AppResource
{
    public const string Company = nameof(Company);
    public const string Member = nameof(Member);
}

public static class AppPermissions
{
    private static readonly AppPermission[] allPermissions =
    {     
        new("Update Company", AppAction.Update, AppResource.Company),
        new("Invite Member", AppAction.Create, AppResource.Member),
        new("Delete Member", AppAction.Delete, AppResource.Member),
    };

    public static IReadOnlyList<AppPermission> All { get; } = new ReadOnlyCollection<AppPermission>(allPermissions);
}

public record AppPermission(string Description, string Action, string Resource)
{
    public string Name => NameFor(Action, Resource);
    public static string NameFor(string action, string resource)
    {
        return $"Permissions.{resource}.{action}";
    }
}
