using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace FastRecruiter.Api.Exceptions;

public class CustomExceptionHandler(ILogger<CustomExceptionHandler> _logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(httpContext);
        ArgumentNullException.ThrowIfNull(exception);
        var problemDetails = new ProblemDetails();
        problemDetails.Instance = httpContext.Request.Path;
        problemDetails.Extensions.Add("errorId", Guid.NewGuid());
        if (exception is CustomException e)
        {
            httpContext.Response.StatusCode = (int)e.StatusCode;
            problemDetails.Detail = e.Message;
            problemDetails.Type = e.Type;

            if (e.ErrorMessages != null && e.ErrorMessages.Any())
            {
                problemDetails.Extensions.Add("errors", e.ErrorMessages);
            }
        }
        
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken).ConfigureAwait(false);
        return true;
    }
}
