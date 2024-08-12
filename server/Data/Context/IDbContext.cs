using FastRecruiter.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FastRecruiter.Api.Data.Context;

public interface IDbContext
{
    public DbSet<User> ApplicationUsers { get; }
    public DbSet<Company> Companies { get; }
    public DbSet<UserCompany> UserCompanies { get; }
    public DbSet<Location> Locations { get; }
}
