using FastRecruiter.Application.Common.Interfaces;

namespace FastRecruiter.Application.Identity.Tokens
{
    public interface ITokenService : ITransientService
    {
        Task<TokenResponse> GetTokenAsync(TokenRequest request, string ipAddress, CancellationToken cancellationToken);
    }
}
