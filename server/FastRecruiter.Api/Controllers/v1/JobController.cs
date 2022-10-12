using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Job;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace FastRecruiter.Api.Controllers.v1
{
    [Authorize]
    public class JobController : VersionedApiController
    {
        [HttpPost]
        [OpenApiOperation("Create a new job offer.", "")]
        public Task<string> CreateAsync(CreateJobRequest request)
        {
            return Mediator.Send(request);
        }

        [HttpPost("{id}")]
        [OpenApiOperation("publish a job offer.", "")]
        public Task<string> PublishJob(PublishJobOfferRequest id)
        {
            return Mediator.Send(id);
        }

        [HttpPost("{id}/update-status")]
        [OpenApiOperation("change  job offer status.", "")]
        public async Task<ActionResult<string>> UpdateJobStatus(UpdateJobStatus request, string id)
        {
            return id != request.JobId
                ? BadRequest()
                : await Mediator.Send(request);
        }
    }
}
