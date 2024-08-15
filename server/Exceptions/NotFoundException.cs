using System.Net;

namespace FastRecruiter.Api.Exceptions;

public class NotFoundException(string message) : CustomException(message, HttpStatusCode.NotFound)
{
}
