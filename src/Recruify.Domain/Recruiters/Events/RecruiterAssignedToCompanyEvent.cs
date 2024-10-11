using Recruify.Domain.Common;

namespace Recruify.Domain.Recruiters.Events;

public class RecruiterAssignedToCompanyEvent : DomainEventBase
{
    public Guid RecruiterId { get; }
    public Guid CompanyId { get; }

    public RecruiterAssignedToCompanyEvent(Guid recruiterId, Guid companyId)
    {
        RecruiterId = recruiterId;
        CompanyId = companyId;
    }
}
