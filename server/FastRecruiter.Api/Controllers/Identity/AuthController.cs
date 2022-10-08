using FastRecruiter.API.Controllers;
using FastRecruiter.Application.Identity.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers.Identity
{
    [AllowAnonymous]
    public class AuthController : VersionNeutralApiController
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost("register")]
        public Task<string> RegisterAsync(CreateUserRequest request)
        {
            return _userService.CreateAsync(request);
        }
    }
}
