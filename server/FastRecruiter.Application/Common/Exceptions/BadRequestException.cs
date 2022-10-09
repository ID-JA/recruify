using System.Net;

namespace FastRecruiter.Application.Common.Exceptions
{
    public class BadRequestException : CustomException
    {
        public BadRequestException(string message, List<string>? errors = null) : base(message, errors, HttpStatusCode.BadRequest)
        {
        }
    }
}
