using FastRecruiter.Api.Identity.Users.Features.UserInfo;

namespace FastRecruiter.Api.Services.Companies.DTOs;

public class CompanyMembersDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<UserDto> Users { get; set; }
}
