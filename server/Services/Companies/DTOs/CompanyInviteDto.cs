namespace FastRecruiter.Api.Services.Companies.DTOs;

public class CompanyInviteDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public Guid CompanyId { get; set; }
    public DateTime ExpireAt { get; set; }
    public DateTime CreatedAt { get; set; }
}
