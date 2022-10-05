using FastRecruiter.API.Models.Entities;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FastRecruiter.API.Identity.Users
{
    public class UserService : IUserService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        //private readonly SecuritySettings _securitySettings;
        //private readonly IFileStorageService _fileStorage;
        //private readonly IMailService _mailService;
        private readonly ApplicationDbContext _db;

        public UserService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, ApplicationDbContext db)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _db = db;
        }

        public async Task<string> CreateAsync(CreateUserRequest request, string origin)
        {
            var user = new ApplicationUser
            {
                FullName = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber.ToString(),
            };

            var employer = new Employer
            {
                PhoneNumber = request.PhoneNumber,
                CompanyLocation = request.CompanyLocation,
                CompanyName = request.CompanyName,
                CompanyWebsite = request.CompanyWebsite,
                ZipCode = request.ZipCode,
                Position = request.Position,
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            await _db.Employers.AddAsync(employer);

            if (!result.Succeeded)
                throw new Exception("Validation Errors Occurred.");

            await _db.SaveChangesAsync();
            var messages = new List<string> { string.Format("User {0} Registered.", user.UserName) };

            return string.Join(Environment.NewLine, messages);

        }

        public async Task<bool> ExistsWithNameAsync(string name)
        {
            return await _userManager.FindByNameAsync(name) is not null;
        }

        public async Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null)
        {
            return await _userManager.FindByEmailAsync(email.Normalize()) is ApplicationUser user && user.Id != exceptId;
        }

        public async Task<List<UserDetailsDto>> GetListAsync(CancellationToken cancellationToken) =>
           (await _userManager.Users
                   .AsNoTracking()
                   .ToListAsync(cancellationToken))
               .Adapt<List<UserDetailsDto>>();

        public Task<int> GetCountAsync(CancellationToken cancellationToken) =>
           _userManager.Users.AsNoTracking().CountAsync(cancellationToken);

        public async Task<UserDetailsDto> GetAsync(string userId, CancellationToken cancellationToken)
        {
            var user = await _userManager.Users
                .AsNoTracking()
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync(cancellationToken);

            _ = user ?? throw new Exception("User Not Found.");


            return user.Adapt<UserDetailsDto>();
        }

    }
}
