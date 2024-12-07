using Ardalis.Specification;

namespace Recruify.Domain.Common;

public interface IReadRepository<T> : IReadRepositoryBase<T> where T : class, IAggregateRoot
{

}