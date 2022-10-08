using FastRecruiter.Domain.Entities;
using FastRecruiter.Infrasructure.Identity;
using FastRecruiter.Infrasructure.Persistence.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FastRecruiter.Infrasructure.Persistence.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Employer> Employers { get; set; }
        public DbSet<Job> Jobs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new JobConfig());
            base.OnModelCreating(builder);
        }
    }
}
