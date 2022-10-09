using System.Net;

namespace FastRecruiter.Application.Common.Exceptions
{
    public class UnauthorizedException : CustomException
    {
        public UnauthorizedException(string message) : base(message, null, HttpStatusCode.Unauthorized)
        {
        }
    }
}
