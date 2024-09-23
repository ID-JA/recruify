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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;

namespace FastRecruiter.Api.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController(IUserService _userService, ITokenService _tokenService, UserManager<User> _userManager) : ControllerBase
{
    [HttpGet("account/external-login")]
    [AllowAnonymous]
    public IActionResult GoogleLogin(string provider, string returnUrl)
    {
        var redirectUrl = Url.Action(nameof(OAuthCallback), "Auth", new { returnUrl });
        var chanllengeResult = _userService.SetupExternalAuthentication(provider, redirectUrl!);
        return chanllengeResult;
    }

    [HttpGet("account/external-auth-callback")]
    [AllowAnonymous]
    public async Task<IActionResult> OAuthCallback(string? returnUrl = null)
    {
        var user = await _userService.HandleExternalAuthenticationCallbackAsync();

        var tokens = await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(user.Email!, string.Empty, true), CancellationToken.None);
        
        _tokenService.SetTokenInCookie(tokens, HttpContext);
        
        return Redirect(WebUtility.UrlDecode(returnUrl) ?? "/");
    }

    [HttpPost("google-ontap-signin")]
    [AllowAnonymous]
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

        var tokens = await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(user.Email!, string.Empty, true), CancellationToken.None);
        _tokenService.SetTokenInCookie(tokens, HttpContext);

        return Ok();
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] TokenGenerationCommand request, CancellationToken cancellationToken)
    {
        var tokens = await _tokenService.GenerateTokenAsync(request, cancellationToken);
        _tokenService.SetTokenInCookie(tokens, HttpContext);

        return Ok();
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request, CancellationToken cancellationToken)
    {
        var serverUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
        var result = await _userService.RegisterAsync(request, serverUrl, cancellationToken);
        return Ok(result);
    }


    [HttpGet("confirm-email")]
    [AllowAnonymous]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token, CancellationToken cancellationToken)
    {
        var result = await _userService.ConfirmEmailAsync(userId, token, cancellationToken);
        // TODO : Redirect to Success Confirmation page 
        return result ? Redirect("https://google.com") : BadRequest("Account Confirmation Failed");
    }

    [HttpPost]
    [Route("refresh-token")]
    public async Task<IActionResult> Refresh(CancellationToken cancellationToken)
    {
        HttpContext.Request.Cookies.TryGetValue("access-token", out var accessToken);
        HttpContext.Request.Cookies.TryGetValue("refresh-token", out var refreshToken);

        var tokens = await _tokenService.RefreshTokenAsync(new RefreshTokenCommand(accessToken, refreshToken), cancellationToken);

        _tokenService.SetTokenInCookie(tokens, HttpContext);
        return Ok("refreshed");
    }

}

public class GoogleSignInDto
{
    public string Credential { get; set; }
}