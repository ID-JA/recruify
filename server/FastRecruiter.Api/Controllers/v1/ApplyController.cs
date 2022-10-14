using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Job;
using FastRecruiter.Application.Job.Commands;
using FastRecruiter.Application.Job.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers.v1
{
    [AllowAnonymous]
    public class ApplyController : VersionedApiController
    {

        [HttpGet("{id}")]
        public Task<OfferDto> GetOffer(string id)
        {
            return Mediator.Send(new GetJobOfferRequest(id));
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<string>> ApplyToOffer(ApplyToOfferRequest request, string id)
        {
            return id != request.JobId
                ? BadRequest()
                : await Mediator.Send(request);
        }

    }
}
