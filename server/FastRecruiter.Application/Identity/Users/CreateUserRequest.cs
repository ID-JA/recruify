namespace FastRecruiter.Application.Identity.Users
{
    public class CreateUserRequest
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string CompanyName { get; set; } = default!;
        public string CompanyLocation { get; set; } = default!;
        public string? CompanyWebsite { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public int ZipCode { get; set; } = default!;
        public string Position { get; set; } = default!;
    }
}
