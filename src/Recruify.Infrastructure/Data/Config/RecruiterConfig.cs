using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recruify.Domain.Recruiters;
using Recruify.Infrastructure.Identity;

namespace Recruify.Infrastructure.Data.Config;

internal class RecruiterConfig : IEntityTypeConfiguration<Recruiter>
{
    public void Configure(EntityTypeBuilder<Recruiter> builder)
    {
        builder.HasKey(r => r.Id);
        builder.Property(r => r.IdentityUserId).IsRequired();
        builder.HasOne<ApplicationUser>()
            .WithOne()
            .HasForeignKey<Recruiter>(r => r.IdentityUserId)
            .IsRequired();
        builder.HasIndex(r => r.IdentityUserId).IsUnique();
    }
}
