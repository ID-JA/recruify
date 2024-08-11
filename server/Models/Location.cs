namespace FastRecruiter.Api.Models;

public class Location
{
    public Guid Id { get; set; }
    public bool IsPrimaryLocation { get; set; }
    public string Name { get; set; }
    public string StreetAddress { get; set; }
    public string Building { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public int PostCode { get; set; }
    public string Country { get; set; }
    public Guid CompanyId { get; set; }

    public Company Company { get; set; }

}
