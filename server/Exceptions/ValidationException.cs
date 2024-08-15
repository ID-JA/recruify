using System.Net;

namespace FastRecruiter.Api.Exceptions;

public class ValidationException : CustomException
{
    public ValidationException(string message, IEnumerable<string> errors) : base(message, errors, HttpStatusCode.BadRequest)
    {
    }

    public ValidationException(string message) : base(message,HttpStatusCode.BadRequest)
    {
        
    }
}
