using Ardalis.Specification;
using SkillEntity = FastRecruiter.Domain.Entities.Skill;

namespace FastRecruiter.Application.Specifications
{
    public class SkillSpec : Specification<SkillEntity>
    {
        public SkillSpec(string name)
        {
            Query.Where(x => x.Name.Contains(name)).OrderBy(s => s.Name).Take(10);
        }
    }
}
