using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FastRecruiter.API.Models;

public class Employer
{
    [Key]
    public string userId { get; set; }

    public int ZipCode { get; set; }
    public int PhoneNumber { get; set; }

    public string CompanyName { get; set; }
    public string Position { get; set; }
    public string CompanyLocation { get; set; }
    public string? CompanyWebsite { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    [ForeignKey("userId")]
    public ApplicationUser user { get; set; }

    public virtual ICollection<Job> Jobs { get; set; }
}


