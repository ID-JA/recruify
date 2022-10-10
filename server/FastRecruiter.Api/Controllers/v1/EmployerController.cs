using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Job;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FastRecruiter.Api.Controllers.v1
{
    [Authorize]
    public class EmployerController : VersionedApiController
    {

        [HttpGet("jobs")]
        public Task<List<JobDto>> GetJobs()
        {
            return Mediator.Send(new GetJobsRequest(User.FindFirstValue(ClaimTypes.NameIdentifier)));
        }
    }
}
