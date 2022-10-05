using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.API.Controllers;

[Route("api/v{version:apiVersion}/[controller]")]
public class VersionedApiController : BaseApiController
{
}
