using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recruify.Domain.Recruiters;

namespace Recruify.Infrastructure.Data.Config;

internal class RecruiterConfig : IEntityTypeConfiguration<Recruiter>
{
    public void Configure(EntityTypeBuilder<Recruiter> builder)
    {
        builder.HasIndex(r => r.IdentityUserId).IsUnique();
    }
}
