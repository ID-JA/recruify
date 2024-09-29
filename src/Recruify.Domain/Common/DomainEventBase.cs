using MediatR;

namespace Recruify.Domain.Common;

public class DomainEventBase : INotification
{
    public DateTime DateOccurred { get; protected set; } = DateTime.UtcNow;
}
