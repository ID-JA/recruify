using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace FastRecruiter.Api.Data;

public interface IDatabaseInitializer
{
    public Task SeedAsync(CancellationToken cancellationToken);
}


public class DatabaseInitializer(RoleManager<Role> _roleManager,
                                 UserManager<User> _userManager,
                                 IUserService _userService) : IDatabaseInitializer
{
    public async Task SeedAsync(CancellationToken cancellationToken)
    {
        await SeedRolesAsync();
        await SeedDetaulOwnerUserAsync();
    }

    private async Task SeedRolesAsync()
    {
        string[] defaultRoles = ["Owner", "Member"];
        foreach (string roleName in defaultRoles)
        {
            if (await _roleManager.Roles.SingleOrDefaultAsync(r => r.Name == roleName)
                is not Role role)
            {
                role = new Role(roleName);
                await _roleManager.CreateAsync(role);
            }
        }
    }

    private async Task SeedDetaulOwnerUserAsync()
    {
        if (await _userManager.Users.FirstOrDefaultAsync(u => u.Email == "default.owner@gmail.com") is not User adminUser)
        {
            string adminUserName = $"ID93.Admin".ToUpperInvariant();
            adminUser = new User
            {
                FirstName = "Default",
                LastName = "Owner",
                Email = "default.owner@gmail.com",
                UserName = adminUserName,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                Role = "Owner",
                NormalizedEmail = "default.owner@gmail.com",
                NormalizedUserName = adminUserName.ToUpperInvariant(),
                CreatedAt = DateTime.UtcNow,
            };

            var password = new PasswordHasher<User>();
            adminUser.PasswordHash = password.HashPassword(adminUser, "Owner123@");
            await _userManager.CreateAsync(adminUser);
        }

            await _userService.AssignRoleAndPermissionsToUserAsync("Owner", AppPermissions.Owner, adminUser);
    }
}