using FastRecruiter.Api.Identity.Users.Features.UserInfo;
using FastRecruiter.Api.Models;

namespace FastRecruiter.Api.Services.Companies.DTOs;

public class CompanyDetailDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Industry { get; set; }
    public string Size { get; set; }
}

