using Microsoft.AspNetCore.Identity;

namespace FastRecruiter.API.Models;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
