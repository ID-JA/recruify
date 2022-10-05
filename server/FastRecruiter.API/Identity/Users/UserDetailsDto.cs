namespace FastRecruiter.API.Identity.Users
{
    public class UserDetailsDto
    {
        public string Id { get; set; }

        public string? UserName { get; set; }

        public string? Email { get; set; }

        public bool EmailConfirmed { get; set; }

    }
}
