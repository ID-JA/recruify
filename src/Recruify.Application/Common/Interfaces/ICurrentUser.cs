using System.Security.Claims;
using ErrorOr;
using Recruify.Domain.Enums;
using Recruify.Domain.Recruiters;

namespace Recruify.Application.Common.Interfaces;

public interface ICurrentUser
{
    string? Name { get; }

    Guid GetUserId();

    UserType GetUserRole();

    string? GetUserEmail();

    bool IsAuthenticated();

    bool IsInRole(string role);

    IEnumerable<Claim>? GetUserClaims();
}
