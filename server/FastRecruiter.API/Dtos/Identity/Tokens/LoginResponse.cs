namespace FastRecruiter.API.Dtos.Identity.Tokens
{
    public record LoginResponse(string Token, string RefreshToken, DateTime RefreshTokenExpiryTime);
}
