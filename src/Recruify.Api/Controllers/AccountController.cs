using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Recruify.Application.Identity.Commands;
using Recruify.Application.Identity.Queries;

namespace Recruify.Api.Controllers;

public class AccountController(ISender mediator) : BaseController
{

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        var result = await mediator.Send(new GetCurrentUserQuery());
        return result.Match(Ok, Problem);
    }

    [HttpGet("confirm")]
    public async Task<IActionResult> ConfirmAccount([FromQuery] string userId, [FromQuery] string token)
    {
        var result = await mediator.Send(new ConfirmAccountCommand(userId, token));

        // TODO: Redirect user to a success page / login page / dashboard
        return result.Match(_ => Redirect("https://www.google.com"), Problem);
    }
}
