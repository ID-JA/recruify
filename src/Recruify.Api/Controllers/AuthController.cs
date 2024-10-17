using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recruify.Application.Identity.Commands;
using Recruify.Application.Identity.Dtos;

namespace Recruify.Api.Controllers
{
    public class AuthController(ISender _mediator) : BaseController
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

            var result = await _mediator.Send(command);

            return result.Match(userId => Created(), Problem);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserRequest request)
        {
            var command = new LoginUserCommand(request.Email, request.Password);

            var result = await _mediator.Send(command);

            return result.Match(
                success => Ok(success),
                Problem
            );
        }

        [HttpGet("test")]
        public IActionResult Get()
        {
            return Ok("This endpoint is working");
        }
    }
}
