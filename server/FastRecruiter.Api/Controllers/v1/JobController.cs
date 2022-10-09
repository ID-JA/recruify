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
        public IActionResult GetById(int id)
        {
            return Ok(id);
        }

        [HttpPost]
        [OpenApiOperation("Create a new job offer.", "")]
        public Task<string> CreateAsync(CreateJobRequest request)
        {
            return Mediator.Send(request);
        }
    }
}
