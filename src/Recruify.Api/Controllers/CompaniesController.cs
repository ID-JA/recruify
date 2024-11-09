using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Recruify.Application.Companies.Commands;
using Recruify.Application.Companies.Dtos;

namespace Recruify.Api.Controllers;

public class CompaniesController(ISender sender) : BaseController
{
   [HttpPost("register")]
   [Authorize]
   public async Task<IActionResult> RegisterCompany([FromBody] RegisterCompanyRequest request)
   {
      var result = await sender.Send(new CreateCompanyCommand(request.Name, request.Industry, request.Size)); 
      return result.Match(_ => Ok("Created Successfully"), Problem);
   }
}