using FastRecruiter.Api.Identity;

namespace FastRecruiter.Api.Services.Users.Features.RegisterUser;

public record RegisterUserResponse(Guid? userId,TokenResponse tokens);