namespace FastRecruiter.API.Identity.Tokens
{
    public record LoginResponse(string Token, string RefreshToken, DateTime RefreshTokenExpiryTime);

}
