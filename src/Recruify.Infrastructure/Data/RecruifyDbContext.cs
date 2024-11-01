using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Recruify.Domain.Companies;
using Recruify.Domain.Jobs;
using Recruify.Domain.Recruiters;
using Recruify.Infrastructure.Identity;
using System.Reflection;
namespace Recruify.Infrastructure.Data;

public class RecruifyDbContext(DbContextOptions<RecruifyDbContext> options) : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<CompanyInvite> CompanyInvites => Set<CompanyInvite>();
    public DbSet<CompanyLocation> CompanyLocations => Set<CompanyLocation>();
    public DbSet<Recruiter> Recruiters => Set<Recruiter>();
    public DbSet<RecruiterPermission> RecruiterPermissions => Set<RecruiterPermission>();
    public DbSet<Job> Jobs => Set<Job>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}
