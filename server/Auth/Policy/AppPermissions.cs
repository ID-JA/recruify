﻿using System.Collections.ObjectModel;

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

    public static IReadOnlyList<AppPermission> Owner { get; } = new ReadOnlyCollection<AppPermission>(allPermissions);
}

public record AppPermission(string Description, string Action, string Resource, bool IsBasic = false, bool IsRoot = false)
{
    public string Name => NameFor(Action, Resource);
    public static string NameFor(string action, string resource)
    {
        return $"Permissions.{resource}.{action}";
    }
}