using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Identity.Tokens;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Services.Companies;
using FastRecruiter.Api.Services.Companies.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FastRecruiter.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompaniesController(ITokenService _tokenService, ICompanyService _companyService) : ControllerBase
{

    [HttpPost("register")]
    [RequiredPermission("Permissions.Company.Update")]
    public async Task<IActionResult> CompanyRegistrationAsync([FromBody] RegisterCompanyRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _companyService.RegisterCompanyAsync(request, cancellationToken));
    }

    [AllowAnonymous]
    [HttpGet("invite/validate")]
    public async Task<IActionResult> ValidateInvite([FromQuery] string email, [FromQuery] Guid token)
    {
        var (IsValid, CompanyName, ErrorMessage) = await _companyService.ValidateInviteAsync(email, token);

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

      var tokens =   await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(request.Email, request.Password,false),cancellationToken);

        _tokenService.SetTokenInCookie(tokens, HttpContext);
        return Ok("Success");
    }
}
