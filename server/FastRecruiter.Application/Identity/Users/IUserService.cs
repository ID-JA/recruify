using FastRecruiter.Application.Common.Interfaces;

namespace FastRecruiter.Application.Identity.Users
{
    public interface IUserService : ITransientService
    {
        Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null);

        Task<string> CreateAsync(CreateUserRequest request, string origin);

        Task<string> ConfirmEmailAsync(string userId, string code, CancellationToken cancellationToken);

        Task<UserDetailsDto> GetAsync(string userId, CancellationToken cancellationToken);


    }
}
