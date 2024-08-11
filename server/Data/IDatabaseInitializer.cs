using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace FastRecruiter.Api.Data;

public interface IDatabaseInitializer
{
    public Task SeedAsync(CancellationToken cancellationToken);
}


public class DatabaseInitializer(ApplicationDbContext dbContext, RoleManager<Role> _roleManager, UserManager<User> _userManager) : IDatabaseInitializer
{
    public async Task SeedAsync(CancellationToken cancellationToken)
    {
        await SeedRolesAsync();
        await SeedAdminUserAsync();
    }

    private async Task SeedRolesAsync()
    {
        string[] defaultRoles = ["Admin", "Member"];
        foreach (string roleName in defaultRoles)
        {
            if (await _roleManager.Roles.SingleOrDefaultAsync(r => r.Name == roleName)
                is not Role role)
            {
                // create role
                role = new Role(roleName);
                await _roleManager.CreateAsync(role);
            }

            // Assign permissions
            if (roleName == "Admin")
            {
                await AssignPermissionsToRoleAsync(AppPermissions.Admin, role);
            }
            else if (roleName == "Member")
            {
                await AssignPermissionsToRoleAsync(AppPermissions.Member, role);
            }

        }
    }

    private async Task AssignPermissionsToRoleAsync(IReadOnlyList<AppPermission> permissions, Role role)
    {
        var currentClaims = await _roleManager.GetClaimsAsync(role);
        var newClaims = permissions
            .Where(permission => !currentClaims.Any(c => c.Type == "permission" && c.Value == permission.Name))
            .Select(permission => new RoleClaim
            {
                RoleId = role.Id,
                ClaimType = "permission",
                ClaimValue = permission.Name,
            })

        .ToList();

        foreach (var claim in newClaims)
        {
            await dbContext.RoleClaims.AddAsync(claim);
        }

        if (newClaims.Count != 0)
        {
            await dbContext.SaveChangesAsync();
        }

    }

    private async Task AssignPermissionsToUserAsync(IReadOnlyList<AppPermission> permissions, User user)
    {
        var currentClaims = await _userManager.GetClaimsAsync(user);
        var newClaims = permissions
            .Where(permission => !currentClaims.Any(c => c.Value == permission.Name))
            .Select(permission => new UserClaim
            {
                UserId = user.Id,
                ClaimType = "Permission",
                ClaimValue = permission.Name,
            })

        .ToList();

        foreach (var claim in newClaims)
        {
            await dbContext.UserClaims.AddAsync(claim);
        }

        if (newClaims.Count != 0)
        {
            await dbContext.SaveChangesAsync();
        }

    }

    private async Task SeedAdminUserAsync()
    {
        if (await _userManager.Users.FirstOrDefaultAsync(u => u.Email == "default.owner@gmail.com") is not User adminUser)
        {
            string adminUserName = $"ID93.Admin".ToUpperInvariant();
            adminUser = new User
            {
                FirstName = "Default",
                LastName = "Admin",
                Email = "default.owner@gmail.com",
                UserName = adminUserName,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                NormalizedEmail = "default.owner@gmail.com",
                NormalizedUserName = adminUserName.ToUpperInvariant(),
            };

            var password = new PasswordHasher<User>();
            adminUser.PasswordHash = password.HashPassword(adminUser, "Admin123@");
            await _userManager.CreateAsync(adminUser);
        }

        if (!await _userManager.IsInRoleAsync(adminUser, "Admin"))
        {
            await _userManager.AddToRoleAsync(adminUser, "Admin");
            await AssignPermissionsToUserAsync(AppPermissions.Admin, adminUser);
        }
    }
}