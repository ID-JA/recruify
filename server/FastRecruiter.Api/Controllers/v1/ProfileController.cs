using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Identity.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Security.Claims;

namespace FastRecruiter.Api.Controllers.v1
{
    [AllowAnonymous]
    public class ProfileController : VersionedApiController
    {
        private readonly IUserService _userService;

        public ProfileController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [OpenApiOperation("Get profile details of currently logged in user.", "")]
        public async Task<ActionResult<UserDetailsDto>> GetProfileAsync(CancellationToken cancellationToken)
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier) is not { } userId || string.IsNullOrEmpty(userId)
            ? Unauthorized()
                : Ok(await _userService.GetAsync(userId, cancellationToken));
        }

        [HttpGet("validate")]
        public ActionResult ValidateToken()
        {
            return Ok(new { success = User.Identity?.IsAuthenticated });
        }
    }
}
