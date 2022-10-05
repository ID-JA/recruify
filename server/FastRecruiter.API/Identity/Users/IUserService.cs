using FastRecruiter.API.Common.Interfaces;

namespace FastRecruiter.API.Identity.Users
{
    public interface IUserService : ITransientService
    {
        Task<bool> ExistsWithNameAsync(string name);
        Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null);

        Task<List<UserDetailsDto>> GetListAsync(CancellationToken cancellationToken);

        Task<int> GetCountAsync(CancellationToken cancellationToken);

        Task<UserDetailsDto> GetAsync(string userId, CancellationToken cancellationToken);

        Task<string> CreateAsync(CreateUserRequest request, string origin);
        //Task UpdateAsync(UpdateUserRequest request, string userId);

        //Task<string> ConfirmEmailAsync(string userId, string code, CancellationToken cancellationToken);

        //Task<string> ForgotPasswordAsync(ForgotPasswordRequest request, string origin);
        //Task<string> ResetPasswordAsync(ResetPasswordRequest request);
        //Task ChangePasswordAsync(ChangePasswordRequest request, string userId);
    }
}
