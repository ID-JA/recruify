using Recruify.Domain.Enums;

namespace Recruify.Application.Identity.Dtos;

public record RegisterUserRequest(string FirstName, string LastName, string Email, string Password, UserType UserType);