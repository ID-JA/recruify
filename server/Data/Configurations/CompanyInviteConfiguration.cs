using FastRecruiter.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FastRecruiter.Api.Data.Configurations;

public class CompanyInviteConfiguration : IEntityTypeConfiguration<CompanyInvite>
{
    public void Configure(EntityTypeBuilder<CompanyInvite> builder)
    {
        builder.HasIndex(ci => new { ci.Email }).IsUnique(true);
    }
}
