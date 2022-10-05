using FastRecruiter.API.Common.Interfaces;

namespace FastRecruiter.API.Identity.Tokens
{
    public interface ITokenService : ITransientService
    {
        Task<LoginResponse> GetTokenAsync(LoginRequest request, string ipAdress, CancellationToken cancellationToken);
        Task<LoginResponse> RefreshTokenAsync(RefreshTokenRequest request, string ipAddress);

    }
}
