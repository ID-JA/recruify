namespace FastRecruiter.Api.Identity.Users.DTOs;

public class UserPermissionDto
{
    public Guid Id { get; set; }
    public string Permission { get; set; }
    public bool IsAllowed { get; set; }
}
