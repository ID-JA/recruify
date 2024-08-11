namespace FastRecruiter.Api.Models;

public class Company
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<Location> Locations { get; set; }
    public IEnumerable<UserCompany> UserCompanyAssignments { get; set; }
}
