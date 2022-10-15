using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Identity.Tokens;
using FastRecruiter.Application.Identity.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace FastRecruiter.Api.Controllers.Identity
{
    [AllowAnonymous]
    public class AuthController : VersionNeutralApiController
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        public AuthController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost]
        [AllowAnonymous]
        [OpenApiOperation("Request an access token using credentials.", "")]
        public Task<TokenResponse> GetTokenAsync(TokenRequest request, CancellationToken cancellationToken)
        {
            return _tokenService.GetTokenAsync(request, GetIpAddress(), cancellationToken);
        }


        [HttpPost("self-register")]
        public Task<string> RegisterAsync(CreateUserRequest request)
        {
            return _userService.CreateAsync(request, GetOriginFromRequest());
        }

        [HttpGet("confirm-email")]
        [AllowAnonymous]
        [OpenApiOperation("Confirm email address for a user.", "")]
        public Task<string> ConfirmEmailAsync([FromQuery] string userId, [FromQuery] string code, CancellationToken cancellationToken)
        {
            return _userService.ConfirmEmailAsync(userId, code, cancellationToken);
        }

        private string GetIpAddress() =>
       Request.Headers.ContainsKey("X-Forwarded-For")
           ? Request.Headers["X-Forwarded-For"]
           : HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString() ?? "N/A";

        private string GetOriginFromRequest() => $"{Request.Scheme}://{Request.Host.Value}{Request.PathBase.Value}";

    }
}
