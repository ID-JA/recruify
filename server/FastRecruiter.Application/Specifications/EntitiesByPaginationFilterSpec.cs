using Ardalis.Specification;
using FastRecruiter.Application.Common.Models;

namespace FastRecruiter.Application.Specifications
{
    public class EntitiesByPaginationFilterSpec<T, TResult> : Specification<T, TResult>
    {
        public EntitiesByPaginationFilterSpec(PaginationFilter filter)
             =>
            Query.PaginateBy(filter);
    }

    public class EntitiesByPaginationFilterSpec<T> : Specification<T>
    {
        public EntitiesByPaginationFilterSpec(PaginationFilter filter)
             =>
            Query.PaginateBy(filter);
    }
}
