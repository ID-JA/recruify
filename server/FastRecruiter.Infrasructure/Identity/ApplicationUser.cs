﻿using Microsoft.AspNetCore.Identity;

namespace FastRecruiter.Infrasructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }

        public string? ImageUrl { get; set; }

        public int? ZipCode { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}