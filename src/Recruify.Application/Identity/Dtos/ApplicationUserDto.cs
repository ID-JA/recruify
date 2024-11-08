using Recruify.Application.Recruiters;

namespace Recruify.Application.Identity.Dtos;

public record ApplicationUserDto(
    string UserName,
    string FirstName,
    string LastName,
    string Email,
    string RefreshToken,
    RecruiterDto? RecruiterInfo = null);