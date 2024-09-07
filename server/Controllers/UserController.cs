using FastRecruiter.Api.Identity.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(IUserService _userSerivce) : ControllerBase
{
    [HttpGet("info")]
    public async Task<IActionResult> GetUserInfo()
    {
        return Ok(await _userSerivce.GetUserInfo());
    }
}
