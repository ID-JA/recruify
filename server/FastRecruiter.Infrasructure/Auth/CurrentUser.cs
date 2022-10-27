using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Infrasructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace FastRecruiter.Infrasructure.Auth
{
    public class CurrentUser : ICurrentUser, ICurrentUserInitializer
    {
        private readonly UserManager<ApplicationUser> _userManager;


        private ClaimsPrincipal? _user;

        public string? Name => _user?.Identity?.Name;

        private string _userId = string.Empty;

        public IEnumerable<Claim>? GetUserClaims() =>
         _user?.Claims;

        public string GetUserEmail() =>
        IsAuthenticated()
            ? _user!.FindFirstValue(ClaimTypes.Email)
            : string.Empty;

        public string GetUserId() =>
            IsAuthenticated()
            ? _user.FindFirstValue(ClaimTypes.NameIdentifier)
            : _userId;

        public bool IsAuthenticated() =>
        _user?.Identity?.IsAuthenticated is true;

        public void SetCurrentUser(ClaimsPrincipal user)
        {
            if (_user != null)
            {
                throw new Exception("Method reserved for in-scope initialization");
            }

            _user = user;
        }

        public void SetCurrentUserId(string userId)
        {
            if (_userId != string.Empty)
            {
                throw new Exception("Method reserved for in-scope initialization");
            }

            if (!string.IsNullOrEmpty(userId))
            {
                _userId = userId;
            }
        }


    }
}
