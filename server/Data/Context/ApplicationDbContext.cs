using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FastRecruiter.Api.Models;
using System.Reflection.Emit;
using FastRecruiter.Api.Data.Configurations;
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
    public DbSet<UserCompany> UserCompanies => Set<UserCompany>();



    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }
}
