using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Mailing;
using FastRecruiter.Application.Identity.Users;
using FastRecruiter.Domain.Entities;
using FastRecruiter.Infrasructure.Auth;
using FastRecruiter.Infrasructure.Persistence.Context;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Text;

namespace FastRecruiter.Infrasructure.Identity
{
    internal class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly SecuritySettings _securitySettings;
        private readonly IEmailTemplateService _templateService;
        private readonly IMailService _mailService;



        public UserService(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            IOptions<SecuritySettings> securitySettings,
            IEmailTemplateService templateService,
            IMailService mailService)
        {
            _userManager = userManager;
            _context = context;
            _securitySettings = securitySettings.Value;
            _templateService = templateService;
            _mailService = mailService;
        }



        public async Task<string> CreateAsync(CreateUserRequest request, string origin)
        {
            var user = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email,
                UserName = request.Email,
                FullName = request.Name,
                ZipCode = request.ZipCode,
                PhoneNumber = request.PhoneNumber,
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new BadRequestException("Validation Errors Occurred.", result.GetErrors());
            }

            var employer = Employer.CreateEmployer(user.Id, request.CompanyName, request.CompanyLocation, request.CompanyWebsite, request.Position);

            await _context.Employers.AddAsync(employer);
            await _context.SaveChangesAsync();

            var messages = new List<string> { string.Format("User {0} Registered.", user.UserName) };

            if (_securitySettings.RequireConfirmedAccount && !string.IsNullOrEmpty(user.Email))
            {
                if (_securitySettings.RequireConfirmedAccount && !string.IsNullOrEmpty(user.Email))
                {
                    // send verification email
                    string emailVerificationUri = await GetEmailVerificationUriAsync(user, origin);
                    RegisterUserEmailModel eMailModel = new RegisterUserEmailModel()
                    {
                        Email = user.Email,
                        UserName = user.FullName,
                        Url = emailVerificationUri
                    };
                    var mailRequest = new MailRequest(
                        new List<string> { user.Email },
                        "Confirm Registration",
                       $" Hi {eMailModel.UserName}! We're excited to have you get started. First you need to <b>confirm</b>" +
                $" account by pressing the button bellow </br> <a href='{eMailModel.Url}' traget='_blank'>Confirm Account</a>"
                        /*_templateService.GenerateEmailTemplate("email-confirmation", eMailModel)*/);
                    await _mailService.SendAsync(mailRequest, CancellationToken.None);
                    messages.Add($"Please check {user.Email} to verify your account!");
                }
            }

            return string.Join(Environment.NewLine, messages);
        }

        public async Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null)
        {
            return await _userManager.FindByEmailAsync(email.Normalize()) is ApplicationUser user && user.Id != exceptId;
        }


        public async Task<string> ConfirmEmailAsync(string userId, string code, CancellationToken cancellationToken)
        {
            var user = await _userManager.Users
           .Where(u => u.Id == userId && !u.EmailConfirmed)
           .FirstOrDefaultAsync(cancellationToken);

            _ = user ?? throw new InternalServerException("An error occurred while confirming E-Mail.");

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);

            return result.Succeeded
                ? string.Format("Account Confirmed for E-Mail {0}. You can now sign in to your account.", user.Email)
                : throw new InternalServerException(string.Format("An error occurred while confirming {0}", user.Email));

        }

        private async Task<string> GetEmailVerificationUriAsync(ApplicationUser user, string origin)
        {

            string code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            const string route = "api/auth/confirm-email/";
            var endpointUri = new Uri(string.Concat($"{origin}/", route));
            string verificationUri = QueryHelpers.AddQueryString(endpointUri.ToString(), "userId", user.Id);
            verificationUri = QueryHelpers.AddQueryString(verificationUri, "code", code);
            return verificationUri;
        }

        public async Task<UserDetailsDto> GetAsync(string userId, CancellationToken cancellationToken)
        {
            var user = await _userManager.Users
                .AsNoTracking()
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync(cancellationToken);

            _ = user ?? throw new NotFoundException("User Not Found.");

            return user.Adapt<UserDetailsDto>();
        }
    }
}
