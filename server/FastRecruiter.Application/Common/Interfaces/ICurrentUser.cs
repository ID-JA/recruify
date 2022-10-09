using System.Security.Claims;

namespace FastRecruiter.Application.Common.Interfaces
{
    public interface ICurrentUser
    {
        string? Name { get; }

        string GetUserId();

        string GetUserEmail();

        bool IsAuthenticated();

        IEnumerable<Claim>? GetUserClaims();
    }
}
