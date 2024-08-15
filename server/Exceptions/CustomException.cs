using System.Net;

namespace FastRecruiter.Api.Exceptions;

public class CustomException : Exception
{
    public IEnumerable<string>? ErrorMessages { get; }

    public HttpStatusCode StatusCode { get; }
    public string Type { get; set; }
        
    public CustomException(string message, IEnumerable<string>? errors = default, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        : base(message)
    {
        ErrorMessages = errors;
        StatusCode = statusCode;
        Type = statusCode switch
        {
            HttpStatusCode.NotFound => "https://tools.ietf.org/html/rfc7231#section-6.5.4",
            HttpStatusCode.Unauthorized => "https://tools.ietf.org/html/rfc7235#section-3.1",
            HttpStatusCode.BadRequest => "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            _ => "https://tools.ietf.org/html/rfc7231#section-6.6.1"
        };
    }


    public CustomException(string message,HttpStatusCode statusCode = HttpStatusCode.InternalServerError) : base(message)
    {
        ErrorMessages = [];
        StatusCode = statusCode;
    }
}
