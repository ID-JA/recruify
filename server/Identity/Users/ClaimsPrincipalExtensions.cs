using System.Security.Claims;

namespace FastRecruiter.Api.Identity.Users;

public static class ClaimsPrincipalExtensions
{
    public static string? GetUserId(this ClaimsPrincipal principal) => principal.FindFirstValue(ClaimTypes.NameIdentifier);

    public static string? GetEmail(this ClaimsPrincipal principal) => principal.FindFirstValue(ClaimTypes.Email);
}
