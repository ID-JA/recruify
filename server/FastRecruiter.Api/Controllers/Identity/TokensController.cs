using FastRecruiter.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers.Identity
{

    public class TokensController : VersionNeutralApiController
    {
        // validate token
        [Authorize]
        [HttpPost("token-validation")]
        public ActionResult ValidateToken([FromBody] string token)
        {

            return Ok(new { valid = true, token }); ;
        }
    }
}
