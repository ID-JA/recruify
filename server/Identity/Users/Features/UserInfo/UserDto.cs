using FastRecruiter.Api.Models;

namespace FastRecruiter.Api.Identity.Users.Features.UserInfo;

public class UserDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }

    public string? ImageUrl { get; set; }
    public string? RefreshToken { get; set; }
    public string Role { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid? CompanyId { get; set; }

}
