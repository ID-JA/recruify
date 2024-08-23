using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Identity.Tokens;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Identity.Users.Features.Onboarding;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserService _userService) : ControllerBase
    {
        [HttpPost("onboarding")]
        [RequiredPermission("Permissions.Company.Update")]
        public async Task<IActionResult> Onboarding([FromBody] OnboardingUserRequest request, CancellationToken cancellationToken)
        {
            return Ok(await _userService.OnboardingAsync(request, cancellationToken));
        }

        [HttpGet("protected")]
        public IActionResult GetDummy()
        {
            return Ok("protected");
        }
    }
}
