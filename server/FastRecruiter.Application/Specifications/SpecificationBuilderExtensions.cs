using Ardalis.Specification;
using FastRecruiter.Application.Common.Models;

namespace FastRecruiter.Application.Specifications
{
    public static class SpecificationBuilderExtensions
    {
        public static ISpecificationBuilder<T> PaginateBy<T>(this ISpecificationBuilder<T> query, PaginationFilter filter)
        {
            if (filter.PageNumber <= 0)
            {
                filter.PageNumber = 1;
            }

            if (filter.PageSize <= 0)
            {
                filter.PageSize = 10;
            }

            if (filter.PageNumber > 1)
            {
                query = query.Skip((filter.PageNumber - 1) * filter.PageSize);
            }

            return query
                .Take(filter.PageSize);
        }

    }
}
