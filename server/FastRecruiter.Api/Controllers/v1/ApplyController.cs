using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Job;
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
    }
}
