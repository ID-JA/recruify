using FastRecruiter.API.Common.Validation;
using FluentValidation;

namespace FastRecruiter.API.Identity.Users
{
    public class CreateUserRequestValidator : CustomValidator<CreateUserRequest>
    {
        public CreateUserRequestValidator(IUserService userService)
        {
            RuleFor(p => p.Name).Cascade(CascadeMode.Stop)
               .NotEmpty();

            RuleFor(u => u.Email).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .EmailAddress().WithMessage("Invalid Email Address")
                .MustAsync(async (email, _) => !await userService.ExistsWithEmailAsync(email))
                    .WithMessage((_, email) => $"Email {email} is already registered.");

            RuleFor(p => p.Password).Cascade(CascadeMode.Stop)
               .NotEmpty()
               .MinimumLength(6);

            RuleFor(u => u.ZipCode).Cascade(CascadeMode.Stop)
                .NotEmpty().GreaterThanOrEqualTo(6).WithMessage("Invalid zip code.");

            RuleFor(u => u.PhoneNumber).Cascade(CascadeMode.Stop)
                .NotEmpty().LessThan(10).WithMessage("Invalid phone number");

            RuleFor(p => p.Position).Cascade(CascadeMode.Stop)
                .NotEmpty();

            RuleFor(p => p.CompanyLocation).Cascade(CascadeMode.Stop)
                .NotEmpty();

            RuleFor(p => p.CompanyName).Cascade(CascadeMode.Stop)
                .NotEmpty();

        }
    }
}
