using FastRecruiter.Application.Common.Interfaces;

namespace FastRecruiter.Application.Identity.Tokens
{
    public interface ITokenService : ITransientService
    {
        bool ValidateToken(string token);
        Task<TokenResponse> GetTokenAsync(TokenRequest request, string ipAddress, CancellationToken cancellationToken);
    }
}
