using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Recruify.Application.Companies.Commands;

namespace Recruify.Api.Controllers;

public class CompaniesController(ISender sender) : BaseController
{
   [HttpPost("register")]
   [Authorize]
   public async Task<IActionResult> RegisterCompany()
   {
      var result = await sender.Send(new CreateCompanyCommand("Google", "Technology", "100")); 
      return result.Match(_ => Ok("Created Successfully"), Problem);
   }
}