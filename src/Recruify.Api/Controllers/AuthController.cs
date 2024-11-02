using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recruify.Application.Common.Interfaces;
using Recruify.Application.Identity.Commands;
using Recruify.Application.Identity.Dtos;

namespace Recruify.Api.Controllers
{
    public class AuthController(ISender mediator, IIdentityService identityService) : BaseController
    {
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserRequest request)
        {
            var command = new RegisterUserCommand(
                request.FirstName,
                request.LastName,
                request.Email,
                request.Password,
                request.UserType);

            var result = await mediator.Send(command);

            return result.Match(_ => Created(), Problem);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserRequest request)
        {
            var command = new LoginUserCommand(request.Email, request.Password);

            var result = await mediator.Send(command);

            return result.Match(
                success => Ok(success),
                Problem
            );
        }

        [HttpGet("oauth")]
        public IActionResult OAuth([FromQuery] string provider, [FromQuery] string returnUrl)
        {
            var redirectUrl = Url.Action(nameof(OAuthCallback), "Auth", new { returnUrl });
            var challengeResult = identityService.SetupExternalAuthProvider(provider, redirectUrl!);
            return challengeResult;
        }

        [HttpGet("oauth/callback")]
        public async Task<IActionResult> OAuthCallback([FromQuery] string returnUrl)
        {
          var result =  await identityService.HandleOAuth(HttpContext);
          return result.Match(_ => Redirect(returnUrl), Problem)!;
        }
        
        [HttpGet("test")]
        public IActionResult Get()
        {
            return Ok("This endpoint is working");
        }
    }
}
