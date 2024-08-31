using FastRecruiter.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FastRecruiter.Api.Data.Context;

public interface IDbContext
{
    public DbSet<User> ApplicationUsers { get; }
    public DbSet<Company> Companies { get; }
    public DbSet<CompanyInvite> CompanyInvites { get; }
    public DbSet<Location> Locations { get; }
    public DbSet<UserPermission> UserPermissions { get; }
    public DbSet<VerificationToken> VerificationTokens { get; }
}
