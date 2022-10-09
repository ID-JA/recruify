using FluentValidation;

namespace FastRecruiter.Application.Identity.Tokens
{
    public class TokenRequest
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;

    }

    public class TokenRequestValidator : AbstractValidator<TokenRequest>
    {
        public TokenRequestValidator()
        {
            RuleFor(p => p.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid Email Address.");

            RuleFor(p => p.Password)
                .NotEmpty().WithMessage("Password is required.");
        }
    }

}