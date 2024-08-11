namespace FastRecruiter.Api.Auth.Jwt;

public class JwtOptions
{
    public string Key { get; set; }
    public int TokenExpirationInMinutes { get; set; }
    public int RefreshTokenExpirationInDays { get; set; }
}
