using FastRecruiter.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers.v1
{
    [AllowAnonymous]
    public class JobController : VersionedApiController
    {
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(id);
        }
    }
}
