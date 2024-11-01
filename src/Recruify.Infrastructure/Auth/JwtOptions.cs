namespace Recruify.Infrastructure.Auth;

public class JwtOptions
{
    public string Key { get; set; } = string.Empty;
    public string Issuer { get; set; } = "http://localhost:3000";
    public string Audience { get; set; } = "recruify";
    public int TokenExpirationInMinutes { get; set; } = 120;
    public int RefreshTokenExpirationInDays { get; set; } = 7;
}
