namespace FastRecruiter.API.Identity.Tokens
{
    public record RefreshTokenRequest(string Token, string RefreshToken);
}
