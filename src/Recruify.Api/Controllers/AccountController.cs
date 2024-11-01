using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recruify.Application.Identity.Commands;

namespace Recruify.Api.Controllers;

public class AccountController(ISender _mediator) : BaseController
{

    [HttpGet("confirm")]
    public async Task<IActionResult> ConfirmAccount([FromQuery] string userId, [FromQuery] string token)
    {
        var result = await _mediator.Send(new ConfirmAccountCommand(userId, token));

        // TODO: Redirect user to a success page / login page / dashboard
        return result.Match(_ => Redirect("https://www.google.com"), Problem);
    }
}
