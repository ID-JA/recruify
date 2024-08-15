using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Identity.Tokens;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Identity.Users.Features.Onboarding;
using FastRecruiter.Api.Identity.Users.Features.RegisterUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers;

[Route("api/auth")]
[ApiController]
[AllowAnonymous]
public class AuthController(IUserService _userService, ITokenService _tokenService) : ControllerBase
{
    [HttpGet("google-login")]
    public IActionResult GoogleLogin()
    {
        var redirectUrl = Url.Action(nameof(OAuthCallback), "Auth");
        return _userService.SetupExternalAuthentication("Google",redirectUrl!);
    }

    [HttpGet("microsoft-login")]
    public IActionResult MicrosftLogin()
    {
        var redirectUrl = Url.Action(nameof(OAuthCallback), "Auth");
        return _userService.SetupExternalAuthentication("Microsoft", redirectUrl!);
    }

    [HttpGet("oauth-callback")]
    public async Task<IActionResult> OAuthCallback()
    {
        var user = await _userService.HandleExternalAuthenticationCallbackAsync();

        var token = await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(user.Email!, string.Empty, true), CancellationToken.None);
        return Ok(new { Tokens = token, RequiresOnboarding = true });
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] TokenGenerationCommand request, CancellationToken cancellationToken)
    {
        return Ok(await _tokenService.GenerateTokenAsync(request, cancellationToken));
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request, CancellationToken cancellationToken)
    {
        var result = await _userService.RegisterAsync(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost("onboarding")]
    [RequiredPermission("Permissions.Company.Update")]
    public async Task<IActionResult> Onboarding([FromBody] OnboardingUserRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _userService.OnboardingAsync(request, cancellationToken));
    }
}
