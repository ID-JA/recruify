using FastRecruiter.Application.Identity.Users;
using FastRecruiter.Domain.Entities;
using FastRecruiter.Infrasructure.Persistence.Context;
using Microsoft.AspNetCore.Identity;

namespace FastRecruiter.Infrasructure.Identity
{
    internal class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        public UserService(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<string> CreateAsync(CreateUserRequest request)
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
                throw new Exception("Validation Errors Occurred.");

            }

            var employer = Employer.CreateEmployer(user.Id, request.CompanyName, request.CompanyLocation, request.CompanyWebsite, request.Position);

            await _context.Employers.AddAsync(employer);
            await _context.SaveChangesAsync();

            var messages = new List<string> { string.Format("User {0} Registered.", user.UserName) };

            return string.Join(Environment.NewLine, messages);
        }
    }
}
