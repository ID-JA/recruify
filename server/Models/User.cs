using Microsoft.AspNetCore.Identity;
using System.ComponentModel;

namespace FastRecruiter.Api.Models;

public class User : IdentityUser<Guid>
{
    [DefaultValue("")]
    public string FirstName { get; set; }
    [DefaultValue("")]
    public string LastName { get; set; }
    public string? ImageUrl { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    public string Role { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid? CompanyId { get; set; }
    public Company Company { get; set; }
    public IEnumerable<UserPermission> UserPermissions { get; set; }
}
