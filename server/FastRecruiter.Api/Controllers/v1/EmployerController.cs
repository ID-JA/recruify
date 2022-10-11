using FastRecruiter.API.Controllers;
using Microsoft.AspNetCore.Authorization;

namespace FastRecruiter.Api.Controllers.v1
{
    [Authorize]
    public class EmployerController : VersionedApiController
    {

        //[HttpGet("jobs")]
        //public Task<List<JobDto>> GetJobs()
        //{
        //    var identityId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    return Mediator.Send(new GetJobsRequest(identityId));
        //}
    }
}
