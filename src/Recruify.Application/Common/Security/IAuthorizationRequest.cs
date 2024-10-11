using MediatR;

namespace Recruify.Application.Common.Security;

public interface IAuthorizationRquest<TRequirement> : IRequest<TRequirement>
{
    Guid UserId { get; }
}
