﻿using Microsoft.AspNetCore.Identity;

namespace Recruify.Infrastructure.Identity;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;

    public string RefreshToken { get; set; } = default!;
    public DateTime RefreshTokenExpiryTime { get; set; }
}