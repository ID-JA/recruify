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

        //[HttpPost("{")]
        //[OpenApiOperation("Update a job offer.", "")]
        //public Task<string> PublishJob(string id)
        //{
        //    return Mediator.Send(new PublishJobOfferRequest(id));
        //}
    }
}
