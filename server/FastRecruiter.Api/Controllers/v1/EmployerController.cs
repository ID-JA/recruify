using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Common.Models;
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
        [HttpPost("jobs")]
        public Task<PaginationResponse<JobDto>> GetJobs(GetJobListQuery request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("jobList")]
        public Task<IEnumerable<JobDto>> GetJobList()
        {
            var identityId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Mediator.Send(new GetJobListQueryTemp(identityId));
        }

    }
}
