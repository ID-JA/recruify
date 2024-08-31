namespace FastRecruiter.Api.Models;

public class VerificationToken
{
    public string Id { get; set; }
    public string Token { get; set; }
    public DateTime ExpireAt { get; set; }
    /// <summary>
    /// REMOVE THIS
    /// </summary>
    public bool Used { get; set; }
}
