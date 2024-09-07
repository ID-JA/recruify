namespace FastRecruiter.Api.Services.Companies.DTOs;

public class CompanyInviteesDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<CompanyInviteDto> CompanyInvites { get; set; }
}
