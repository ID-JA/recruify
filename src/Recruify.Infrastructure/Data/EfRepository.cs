using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Recruify.Domain.Common;

namespace Recruify.Infrastructure.Data;

public class EfRepository<T> : RepositoryBase<T>, IReadRepositoryBase<T>, IRepository<T> where T : class, IAggregateRoot
{
    public EfRepository(RecruifyDbContext dbContext) : base(dbContext)
    {
    }
}
