﻿
using System.ComponentModel.DataAnnotations.Schema;

namespace Recruify.Domain.Common;

public abstract class HasDomainEventsBase : IHasDomainEvents
{
    private readonly List<DomainEventBase> _domainEvents = [];
    [NotMapped]
    public IReadOnlyCollection<DomainEventBase> DomainEvents => _domainEvents.AsReadOnly();

    protected void RegisterDomainEvent(DomainEventBase domainEvent) => _domainEvents.Add(domainEvent);
    internal void ClearDomainEvents() => _domainEvents.Clear();
}