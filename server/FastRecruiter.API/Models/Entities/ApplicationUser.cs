using Microsoft.AspNetCore.Identity;

namespace FastRecruiter.API.Models.Entities;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
