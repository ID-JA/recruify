using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Skill;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers.v1
{
    [AllowAnonymous]
    public class SkillController : VersionedApiController
    {
        [HttpGet("autocomplete")]
        public Task<List<string>> GetSkill([FromQuery] string term)
        {
            return Mediator.Send(new GetSkillsQuery(term));
        }
    }
}
