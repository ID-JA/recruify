using ErrorOr;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Recruify.Application.Common.Interfaces;
using Recruify.Application.Common.Mailing;
using Recruify.Domain.Common;
using Recruify.Domain.Enums;
using Recruify.Domain.Recruiters;

namespace Recruify.Application.Identity.Commands;

public record RegisterUserCommand(string FirstName, string LastName, string Email, string Password, UserType UserType) : ICommand<ErrorOr<Guid>>;

public class RegisterUserHandler(IIdentityService identityService, IRepository<Recruiter> recruiterRepository, IMailService mailService, IHttpContextAccessor httpContextAccessor) : ICommandHandler<RegisterUserCommand, ErrorOr<Guid>>
{
    public async Task<ErrorOr<Guid>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var result = await identityService.CreateUserAsync(request.FirstName, request.LastName, request.Email, request.Password);

        if (result.IsError)
        {
            return result.Errors;
        }

        var userId = result.Value;

        switch (request.UserType)
        {
            case UserType.Recruiter:
                var newRecruiter = new Recruiter(userId);
                await recruiterRepository.AddAsync(newRecruiter, cancellationToken);
                break;
            case UserType.Candidate:
            default:
                return Error.Unexpected("Invalid user type");
        }
        var httpRequest = httpContextAccessor.HttpContext?.Request!;
        var emailVerificationUri = await GetEmailVerificationUriAsync(userId.ToString(), $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}");

        var mailRequest = new MailRequest([request.Email],
                                          "Confirm your email",
                                          "email-confirmation",
                                          new { FullName = $"{request.FirstName} {request.LastName}", ConfirmationLink = emailVerificationUri });

        await mailService.SendEmailAsync(mailRequest, cancellationToken);

        return userId;
    }

    private async Task<string> GetEmailVerificationUriAsync(string userId, string serverUrl)
    {
        var result = await identityService.GenerateEmailConfirmationTokenAsync(userId);
        const string route = "api/account/confirm";
        var endpointUri = new Uri(string.Concat($"{serverUrl}/", route));
        var verificationUri = QueryHelpers.AddQueryString(endpointUri.ToString(), "userId", userId);
        verificationUri = QueryHelpers.AddQueryString(verificationUri, "token", result.Value);
        return verificationUri;
    }
}
