using System.Security.Claims;

namespace FastRecruiter.Api.Identity.Users;

public interface ICurrentUser
{
    string? Name { get; }
    Guid GetUserId();
    string? GetUserEmail();
    bool IsAuthenticated();
    bool IsInRole(string role);
    IEnumerable<Claim>? GetUserClaims();
}

public interface ICurrentUserInitializer
{
    public void SetCurrentUserId(string userId);
    public void SetCurrentUser(ClaimsPrincipal user);
}

public class CurrentUser : ICurrentUser, ICurrentUserInitializer
{
    private ClaimsPrincipal? _user;
    private Guid _userId = Guid.Empty;

    public string? Name => _user?.Identity?.Name;

    public IEnumerable<Claim>? GetUserClaims()
    {
        return _user?.Claims;
    }

    public string? GetUserEmail()
    {
        return IsAuthenticated() ? _user.GetEmail() : string.Empty;
    }

    public Guid GetUserId()
    {
        return IsAuthenticated()
                    ? Guid.Parse(_user?.GetUserId() ?? Guid.Empty.ToString())
                    : _userId;
    }

    public bool IsAuthenticated()
    {
        return _user?.Identity?.IsAuthenticated is true;
    }

    public bool IsInRole(string role)
    {
        throw new NotImplementedException();
    }

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
        if (_userId != Guid.Empty)
        {
            throw new Exception("Method reserved for in-scope initialization");
        }

        if (!string.IsNullOrEmpty(userId))
        {
            _userId = Guid.Parse(userId);
        }
    }
}