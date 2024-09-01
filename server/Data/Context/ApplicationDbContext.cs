using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using FastRecruiter.Api.Models;
using System.Reflection;

namespace FastRecruiter.Api.Data.Context;

public class ApplicationDbContext : IdentityDbContext<User, Role, Guid>, IDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
       base(options)
    {
    }

    public DbSet<User> ApplicationUsers => Set<User>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Location> Locations => Set<Location>();
    public DbSet<CompanyInvite> CompanyInvites => Set<CompanyInvite>();
    public DbSet<UserPermission> UserPermissions => Set<UserPermission>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
