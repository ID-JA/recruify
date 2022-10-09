using Ardalis.Specification;
using FastRecruiter.Domain.Contracts;

namespace FastRecruiter.Application.Common.Persistence
{
    public interface IRepository<T> : IRepositoryBase<T>
    where T : class, IAggregateRoot
    {
    }

    public interface IReadRepository<T> : IReadRepositoryBase<T>
    where T : class, IAggregateRoot
    {
    }

    public interface IRepositoryWithEvents<T> : IRepositoryBase<T>
    where T : class, IAggregateRoot
    {
    }
}
