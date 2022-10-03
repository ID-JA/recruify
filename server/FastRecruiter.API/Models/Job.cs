using System.ComponentModel.DataAnnotations.Schema;

namespace FastRecruiter.API.Models;

public class Job
{
    public string Id { get; set; }

    public string EmployerId { get; set; }

    public string Title { get; set; }

    public string Locaiton { get; set; }

    public string Address { get; set; }

    public string EmploymentType { get; set; }

    public string Description { get; set; }

    public string WhyUs { get; set; }

    public string CompanyDescription { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    [ForeignKey("EmployerId")]
    public Employer Employer { get; set; }

    public virtual ICollection<Skill> Skills { get; set; }
    public virtual ICollection<Applicant> Applicants { get; set; }

}



