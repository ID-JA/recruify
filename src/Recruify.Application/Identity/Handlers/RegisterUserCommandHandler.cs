using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.WebUtilities;
using Recruify.Application.Common.Interfaces;
using Recruify.Application.Common.Mailing;
using Recruify.Application.Identity.Commands;
using Recruify.Domain.Common;
using Recruify.Domain.Enums;
using Recruify.Domain.Recruiters;

namespace Recruify.Application.Identity.Handlers;

public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand, ErrorOr<string>>
{
    private readonly IIdentityService _identityService;
    private readonly IRepository<Recruiter> _recruiterRepository;
    private readonly IMailService _mailService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RegisterUserCommandHandler(IIdentityService identityService, IRepository<Recruiter> recruiterRepository, IMailService mailService, IHttpContextAccessor httpContextAccessor)
    {
        _identityService = identityService;
        _recruiterRepository = recruiterRepository;
        _mailService = mailService;
        _httpContextAccessor = httpContextAccessor;
    }
    public async Task<ErrorOr<string>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.CreateUserAsync(request.FirstName, request.LastName, request.Email, request.Password);

        if (result.IsError)
        {
            return result.Errors;
        }

        string userId = result.Value;

        switch (request.UserType)
        {
            case UserType.Recruiter:
                var newRecruiter = new Recruiter(userId);
                await _recruiterRepository.AddAsync(newRecruiter, cancellationToken);
                break;
            default:
                return Error.Unexpected("Invalid user type");
        }
        var Request = _httpContextAccessor.HttpContext?.Request!;
        var emailVerificationUri = await GetEmailVerificationUriAsync(userId, $"{Request.Scheme}://{Request.Host}{Request.PathBase}");

        var mailRequest = new MailRequest([request.Email],
                                          "Confirm your email",
                                          "email-confirmation",
                                          new { FullName = $"{request.FirstName} {request.LastName}", ConfirmationLink = emailVerificationUri });

        await _mailService.SendEmailAsync(mailRequest, cancellationToken);

        return userId;
    }

    private async Task<string> GetEmailVerificationUriAsync(string userId, string serverUrl)
    {
        var result = await _identityService.GenerateEmailConfirmationTokenAsync(userId);
        const string route = "api/account/confirm";
        var endpointUri = new Uri(string.Concat($"{serverUrl}/", route));
        string verificationUri = QueryHelpers.AddQueryString(endpointUri.ToString(), "userId", userId);
        verificationUri = QueryHelpers.AddQueryString(verificationUri, "token", result.Value);
        return verificationUri;

    }
}
