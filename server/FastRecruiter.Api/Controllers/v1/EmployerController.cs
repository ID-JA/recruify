using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Job;
using FastRecruiter.Application.Job.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FastRecruiter.Api.Controllers.v1
{
    [Authorize]
    public class EmployerController : VersionedApiController
    {
        [HttpGet("jobs")]
        public Task<IEnumerable<JobDto>> GetJobs()
        {
            var identityId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Mediator.Send(new GetJobListQuery(identityId));
        }
    }
}
