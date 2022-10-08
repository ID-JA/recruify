namespace FastRecruiter.Application.Identity.Users
{
    public interface IUserService
    {
        Task<string> CreateAsync(CreateUserRequest request);
    }
}
