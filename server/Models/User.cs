using Microsoft.AspNetCore.Identity;

namespace FastRecruiter.Api.Models;

public class User : IdentityUser<Guid>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? ImageUrl { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    public IEnumerable<UserCompany> UserCompanyAssignments { get; set; }
}
