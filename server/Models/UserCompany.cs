namespace FastRecruiter.Api.Models;

public class UserCompany
{
    public Guid UserId { get; set; }
    public Guid CompanyId { get; set; }
    public DateTime AssignedAt { get; set; }
    public bool IsOwner { get; set; }

    public User User { get; set; }
    public Company Company { get; set; }
}
