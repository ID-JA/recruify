namespace Recruify.Application.Identity.Dtos;

public record TokenResponse(string Token, string RefreshToken, DateTime RefreshTokenExpiryTime);