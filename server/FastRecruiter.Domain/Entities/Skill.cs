using FastRecruiter.Domain.Contracts;

namespace FastRecruiter.Domain.Entities;

public class Skill : IAggregateRoot
{
    public int Id { get; set; }

    public string Name { get; set; }
}
