using FastRecruiter.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FastRecruiter.Infrasructure.Persistence.Configuration
{
    internal class JobConfig : IEntityTypeConfiguration<Job>
    {
        public void Configure(EntityTypeBuilder<Job> builder)
        {
            // Foreign key
            builder.HasOne(j => j.Employer)
                .WithMany(e => e.Jobs)
                .HasForeignKey(j => j.EmployerId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
