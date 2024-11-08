namespace Recruify.Domain.Common;

public interface IAppUser
{
    Guid Id { get; }    // Unique identifier for Recruiter or Candidate
    string IdentityUserId { get; set; } // Links to ASP.NET IdentityUser
}