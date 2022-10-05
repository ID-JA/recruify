namespace FastRecruiter.API.Models.Entities;

public class Skill
{
    public string Id { get; set; }
    public string Name { get; set; }

    public virtual ICollection<Job> Jobs { get; set; }

}
