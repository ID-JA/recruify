using FastRecruiter.Api.Identity.Tokens;

namespace FastRecruiter.Api.Identity.Users.Features.RegisterUser;

public record RegisterUserResponse(Guid? userId, TokenResponse tokens);