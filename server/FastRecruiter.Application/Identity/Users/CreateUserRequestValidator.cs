using FluentValidation;

namespace FastRecruiter.Application.Identity.Users
{
    public class CreateUserRequestValidator : AbstractValidator<CreateUserRequest>
    {
        public CreateUserRequestValidator()
        {
            RuleFor(u => u.Email).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Invalid Email Address.");

            RuleFor(u => u.Password).Cascade(CascadeMode.Stop)
                .NotEmpty();

            RuleFor(u => u.Name).Cascade(CascadeMode.Stop)
                .NotEmpty();

            RuleFor(u => u.CompanyName).Cascade(CascadeMode.Stop)
                .NotEmpty();

            RuleFor(u => u.CompanyLocation).Cascade(CascadeMode.Stop)
                .NotEmpty();


            RuleFor(u => u.PhoneNumber).Cascade(CascadeMode.Stop)
                .NotEmpty();

            RuleFor(u => u.ZipCode).Cascade(CascadeMode.Stop)
                .NotEmpty();

        }
    }
}
