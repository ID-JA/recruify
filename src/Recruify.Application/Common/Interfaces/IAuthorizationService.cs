using ErrorOr;
using Recruify.Application.Common.Security;

namespace Recruify.Application.Common.Interfaces;

public interface IAuthorizationService
{
    ErrorOr<Success> AuthorizeCurrentUser<T>(
   IAuthorizationRquest<T> request,
   List<string> requiredRoles,
   List<string> requiredPermissions,
   List<string> requiredPolicies);
}
