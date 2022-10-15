using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Job;
using FastRecruiter.Application.Job.Commands;
using FastRecruiter.Application.Job.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Security.Claims;

namespace FastRecruiter.Api.Controllers.v1
{
    [Authorize]
    public class JobController : VersionedApiController
    {


        [HttpGet("{id}")]
        [OpenApiOperation("Get a job Details.", "")]
        public Task<JobDetailsVm> GetJob(string id)
        {
            return Mediator.Send(new GetJobDetailsQuery(id, User.FindFirstValue(ClaimTypes.NameIdentifier)));
        }

        [HttpGet("{id}/candidates")]
        [OpenApiOperation("Get a job with applicants.", "")]
        public Task<ICollection<ApplicantDto>> GetCandidates(string id)
        {
            return Mediator.Send(new GetJobApplicantsQuery(id));
        }

        [HttpPost]
        [OpenApiOperation("Create a new job offer.", "")]
        public Task<string> CreateJobAsync(CreateJobCommand request)
        {
            return Mediator.Send(request);
        }

        [HttpPut("{id}")]
        [OpenApiOperation("Update a job.", "")]
        public async Task<ActionResult<Guid>> UpdateJobAsync(UpdateJobDetailsCommand request, string id)
        {
            return id != request.Id
                ? BadRequest()
                : Ok(await Mediator.Send(request));
        }

        [HttpPost("{id}/update-status")]
        [OpenApiOperation("change job offer status.", "")]
        public async Task<ActionResult<string>> UpdateJobStatus(UpdateJobStatusCommand request, string id)
        {
            return id != request.JobId
                ? BadRequest()
                : await Mediator.Send(request);
        }

        [HttpDelete("{id}")]
        public Task<string> DeleteJobAsync(string id)
        {
            return Mediator.Send(new DeleteJobCommand(id));
        }
    }
}
