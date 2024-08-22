using System.Net;

namespace FastRecruiter.Api.Exceptions;

public class UnauthorizedException : CustomException
{
    public UnauthorizedException() : base("authentication failed", [], HttpStatusCode.Unauthorized)
    {
    }
    public UnauthorizedException(string message) : base(message, [], HttpStatusCode.Unauthorized)
    {
    }
}
