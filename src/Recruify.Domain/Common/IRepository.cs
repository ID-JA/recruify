using Ardalis.Specification;

namespace Recruify.Domain.Common;

public interface IRepository<T> : IRepositoryBase<T> where T : class, IAggregateRoot
{
}