using Microsoft.AspNetCore.Identity;

namespace FastRecruiter.Api.Models;

public class Role: IdentityRole<Guid>
{
    public Role(string name)
       : base(name)
    {
        NormalizedName = name.ToUpperInvariant();
    }
}
