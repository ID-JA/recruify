using System.Net;

namespace FastRecruiter.Api.Exceptions;

public class ConflictException(string message) : CustomException(message, HttpStatusCode.Conflict)
{
}
