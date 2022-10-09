using FluentValidation;

namespace FastRecruiter.Application.Identity.Users
{
    public class CreateUserRequestValidator : AbstractValidator<CreateUserRequest>
    {

        public CreateUserRequestValidator(IUserService userService)
        {
            RuleFor(u => u.Email).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Invalid Email Address.");

            RuleFor(u => u.Password).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .WithMessage("Password is required.");

            RuleFor(u => u.Name).Cascade(CascadeMode.Stop)
                .NotEmpty();

            RuleFor(u => u.CompanyName).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .WithMessage("Company Name is required.");

            RuleFor(u => u.CompanyLocation).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .WithMessage("Company Location is required.");


            RuleFor(u => u.PhoneNumber).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .WithMessage("Phone Number is required.");

            RuleFor(u => u.ZipCode).Cascade(CascadeMode.Stop)
                .NotEmpty()
                .WithMessage("Zip Code is required.");

        }
    }
}
