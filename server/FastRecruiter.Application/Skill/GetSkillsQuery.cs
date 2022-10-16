using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using MediatR;
using SkillEntity = FastRecruiter.Domain.Entities.Skill;

namespace FastRecruiter.Application.Skill
{
    public class GetSkillsQuery : IRequest<List<string>>
    {
        public string Term { get; set; }

        public GetSkillsQuery(string term)
        {
            Term = term;
        }

    }

    public class GetSkillsQueryHandler : IRequestHandler<GetSkillsQuery, List<string>>
    {
        private readonly IReadRepository<SkillEntity> _skillRepository;

        public GetSkillsQueryHandler(IReadRepository<SkillEntity> skillRepository)
        {
            _skillRepository = skillRepository;
        }

        public async Task<List<string>> Handle(GetSkillsQuery request, CancellationToken cancellationToken)
        {
            var skills = await _skillRepository.ListAsync(new SkillSpec(request.Term));
            return skills.Select(s => s.Name).ToList();
        }
    }
}
