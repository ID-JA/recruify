namespace FastRecruiter.Api.Models;

public class CompanyInvite
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public Guid CompanyId { get; set; }
    public DateTime ExpireAt { get; set; }
    public Guid Token { get; set; }
    public DateTime CreatedAt { get; set; }

    public Company Company { get; set; }
}
