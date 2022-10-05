using FastRecruiter.API.Identity.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;


namespace FastRecruiter.API.Controllers.Identity;

[AllowAnonymous]
public class AuthController : VersionNeutralApiController
{
	private readonly IUserService _userService;

	public AuthController(IUserService userService)
	{
		_userService = userService;
	}


	[HttpPost("register")]
	[OpenApiOperation("Anonymous user creates a user.", "")]
	public Task<string> SelfRegisterAsync(CreateUserRequest request)
	{
		return _userService.CreateAsync(request, "localhost");
	}
	//private string GetOriginFromRequest() => $"{Request.Scheme}://{Request.Host.Value}{Request.PathBase.Value}";
}


