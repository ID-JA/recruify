using FastRecruiter.API.Common.Validation;
using FluentValidation;

namespace FastRecruiter.API.Identity.Tokens
{
    public record class LoginRequest(string Email, string Password);

    public class LoginRequestValidator : CustomValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(p => p.Email).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .EmailAddress().WithMessage("Invalid Email Adress");

            RuleFor(p => p.Password).Cascade(CascadeMode.Stop)
                .NotEmpty();
        }
    }
}
