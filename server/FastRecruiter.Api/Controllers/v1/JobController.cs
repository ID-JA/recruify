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
        [HttpGet("{id}")]
        [OpenApiOperation("Get specific job offer using Id", "")]
        public Task<JobOfferDto> GetById(string id)
        {
            return Mediator.Send(new GetJobRequest(id));
        }

        [HttpPost]
        [OpenApiOperation("Create a new job offer.", "")]
        public Task<string> CreateAsync(CreateJobRequest request)
        {
            return Mediator.Send(request);
        }
    }
}
