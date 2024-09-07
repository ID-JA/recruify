using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Identity.Tokens;
using FastRecruiter.Api.Services.Companies;
using FastRecruiter.Api.Services.Companies.DTOs;
using FastRecruiter.Api.Services.Companies.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompaniesController(ITokenService _tokenService, ICompanyService _companyService, IMediator _mediator) : ControllerBase
{

    [HttpPost("register")]
    [RequiredPermission("Permissions.Company.Update")]
    public async Task<IActionResult> CompanyRegistrationAsync([FromBody] RegisterCompanyRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _companyService.RegisterCompanyAsync(request, cancellationToken));
    }

    [AllowAnonymous]
    [HttpGet("invite/validate")]
    public async Task<IActionResult> ValidateInvite([FromQuery] Guid token)
    {
        var (IsValid, CompanyName, ErrorMessage) = await _companyService.ValidateInviteAsync(token);

        if (!IsValid)
        {
            return BadRequest(ErrorMessage);
        }

        return Ok(new
        {
            isValid = IsValid,
            companyName = CompanyName,
        });
    }

    [AllowAnonymous]
    [HttpPost("invite/accept")]
    public async Task<IActionResult> AcceptCompanyInvitateAsync([FromBody] AcceptCompanyInviteRequest request, CancellationToken cancellationToken)
    {
        await _companyService.AcceptCompanyInvitateAsync(request, cancellationToken);

        var tokens = await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(request.Email, request.Password, false), cancellationToken);

        _tokenService.SetTokenInCookie(tokens, HttpContext);
        return Ok("Success");
    }


    [HttpGet("{id:guid}/members")]
    public async Task<IActionResult> GetMembers([FromRoute] Guid id)
    {
        var result = await _mediator.Send(new GetCompanyMembersQuery(id));
        return Ok(result);
    }

    [HttpGet("{id:guid}/invitees")]
    public async Task<IActionResult> GetInvitees([FromRoute] Guid id)
    {
        var result = await _mediator.Send(new GetCompanyInviteesQuery(id));
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetDetail([FromRoute] Guid id)
    {
        var result = await _mediator.Send(new GetCompanyDetailQuery(id));
        return Ok(result);
    }
}
