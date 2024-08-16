using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Identity.Tokens;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Identity.Users.Features.Onboarding;
using FastRecruiter.Api.Identity.Users.Features.RegisterUser;
using FastRecruiter.Api.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers;

[Route("api/auth")]
[ApiController]
[AllowAnonymous]
public class AuthController(IUserService _userService, ITokenService _tokenService,UserManager<User> _userManager) : ControllerBase
{
    [HttpGet("google-login")]
    public IActionResult GoogleLogin()
    {
        var redirectUrl = Url.Action(nameof(OAuthCallback), "Auth");
        return _userService.SetupExternalAuthentication("Google", redirectUrl!);
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

    [HttpPost("google-ontap-signin")]
    public async Task<IActionResult> GoogleSignIn([FromBody] GoogleSignInDto dto)
    {
        var payload = await GoogleJsonWebSignature.ValidateAsync(dto.Credential);
        if (payload == null)
            return Unauthorized();

        var user = await _userManager.FindByEmailAsync(payload.Email);
        if (user == null)
        {
            user = new User
            {
                UserName = payload.Email,
                Email = payload.Email,
                FirstName = payload.GivenName,
                LastName = payload.FamilyName,
                ImageUrl = payload.Picture,
                EmailConfirmed = true,
                Role = "Owner", 
            };
            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddLoginAsync(user, new UserLoginInfo(payload.Issuer, payload.Subject, payload.Issuer));
        }

        var token = await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(user.Email!, string.Empty, true), CancellationToken.None);

        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] TokenGenerationCommand request, CancellationToken cancellationToken)
    {
        return Ok(await _tokenService.GenerateTokenAsync(request, cancellationToken));
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request, CancellationToken cancellationToken)
    {
        var serverUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
        var result = await _userService.RegisterAsync(request, serverUrl, cancellationToken);
        return Ok(result);
    }

    [HttpPost("onboarding")]
    [RequiredPermission("Permissions.Company.Update")]
    public async Task<IActionResult> Onboarding([FromBody] OnboardingUserRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _userService.OnboardingAsync(request, cancellationToken));
    }

    [HttpGet("confirm-email")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token, CancellationToken cancellationToken)
    {
        var result = await _userService.ConfirmEmailAsync(userId, token, cancellationToken);
        // TODO : Redirect to Success Confirmation page 
        return result ? Redirect("https://google.com") : BadRequest("Account Confirmation Failed");
    }
}

public class GoogleSignInDto
{
    public string Credential { get; set; }
}