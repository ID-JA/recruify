using Recruify.Domain.Common;
using Recruify.Domain.Companies;
using Recruify.Domain.Recruiters;

namespace Recruify.Domain.Jobs;

public class Job : EntityBase<Guid>, IAggregateRoot
{
    public string Title { get; private set; }
    public Guid CompanyId { get; private set; }
    public Company Company { get; } = null!;
    public Guid CreatedBy { get; private set; }
    public Recruiter Recruiter { get; } = null!;

    public Job(string title, Guid companyId, Guid createdBy)
    {
        Title = title;
        CompanyId = companyId;
        CreatedBy = createdBy;
    }
}
