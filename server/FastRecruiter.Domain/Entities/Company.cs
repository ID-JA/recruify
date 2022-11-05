namespace FastRecruiter.Domain.Entities;


/// <summary>
/// Hiring Companies entity
/// </summary>
public class Company
{
    private Company()
    {

    }

    public string Id { get; private set; }
    public string Name { get; private set; }
    public string? Website { get; private set; }
    public string Location { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; set; }

    public static Company Create(string name, string location, string website) => new Company
    {
        Id = Guid.NewGuid().ToString(),
        Name = name,
        Location = location,
        Website = website,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow,
    };
}
