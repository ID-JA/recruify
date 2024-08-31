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

    [HttpGet("invite")]
    [AllowAnonymous]
    public async Task<IActionResult> ProcessCompanyInvitationAsync([FromQuery] string email, [FromQuery] string token, string? returnUrl, CancellationToken cancellationToken)
    {
        await _companyService.ProcessCompanyInvitationAsync(email, token, cancellationToken);
        var tokens = await _tokenService.GenerateTokenAsync(new TokenGenerationCommand(email, string.Empty, true), CancellationToken.None);
        _tokenService.SetTokenInCookie(tokens, HttpContext);

        return Redirect(WebUtility.UrlDecode(returnUrl) ?? "/");
    }
}
