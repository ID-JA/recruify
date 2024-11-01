namespace Recruify.Application.Identity.Dtos;

public sealed class LoginUserRequest
{
    public required string Email { get; init; }

    public required string Password { get; init; }
}