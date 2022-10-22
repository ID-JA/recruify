using Ardalis.Specification;
using FastRecruiter.Application.Common.Exceptions;
using FastRecruiter.Application.Common.Models;
using System.Linq.Expressions;
using System.Text.Json;

namespace FastRecruiter.Application.Specifications
{
    public static class SpecificationBuilderExtensions
    {
        public static ISpecificationBuilder<T> SearchBy<T>(this ISpecificationBuilder<T> query, BaseFilter filter) =>
       query
           .AdvancedFilter(filter.AdvancedFilter);

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

        public static IOrderedSpecificationBuilder<T> AdvancedFilter<T>(
            this ISpecificationBuilder<T> specificationBuilder, Filter filter
            )
        {
            if (filter is not null)
            {
                var parameter = Expression.Parameter(typeof(T));

                Expression binaryExpresioFilter;

                var filterValid = GetValidFilter(filter);
                binaryExpresioFilter = CreateFilterExpression(filterValid.Field!, filterValid.Operator!, filterValid.Value, parameter);


                ((List<WhereExpressionInfo<T>>)specificationBuilder.Specification.WhereExpressions)
                    .Add(new WhereExpressionInfo<T>(Expression.Lambda<Func<T, bool>>(binaryExpresioFilter, parameter)));
            }

            return new OrderedSpecificationBuilder<T>(specificationBuilder.Specification);
        }

        private static Filter GetValidFilter(Filter filter)
        {
            if (string.IsNullOrEmpty(filter.Field)) throw new CustomException("The field attribute is required when declaring a filter");
            if (string.IsNullOrEmpty(filter.Operator)) throw new CustomException("The Operator attribute is required when declaring a filter");
            return filter;
        }

        private static Expression CreateFilterExpression(
                      string field,
                      string filterOperator,
                      object? value,
                      ParameterExpression parameter)
        {
            var propertyExpresion = GetPropertyExpression(field, parameter);
            var valueExpresion = GeValuetExpression(field, value, propertyExpresion.Type);
            return CreateFilterExpression(propertyExpresion, valueExpresion, filterOperator);
        }

        private static Expression CreateFilterExpression(
                         MemberExpression memberExpression,
                         ConstantExpression constantExpression,
                         string filterOperator)
        {
            return filterOperator switch
            {
                FilterOperator.EQ => Expression.Equal(memberExpression, constantExpression),
                _ => throw new CustomException("Filter Operator is not valid."),
            };
        }

        private static MemberExpression GetPropertyExpression(
        string propertyName,
        ParameterExpression parameter)
        {
            Expression propertyExpression = parameter;
            foreach (string member in propertyName.Split('.'))
            {
                propertyExpression = Expression.PropertyOrField(propertyExpression, member);
            }

            return (MemberExpression)propertyExpression;
        }

        private static string GetStringFromJsonElement(object value)
       => ((JsonElement)value).GetString()!;
        private static ConstantExpression GeValuetExpression(
        string field,
        object? value,
        Type propertyType)
        {
            if (value == null) return Expression.Constant(null, propertyType);

            if (propertyType.IsEnum)
            {
                string? stringEnum = GetStringFromJsonElement(value);

                if (!Enum.TryParse(propertyType, stringEnum, true, out object? valueparsed)) throw new CustomException(string.Format("Value {0} is not valid for {1}", value, field));

                return Expression.Constant(valueparsed, propertyType);
            }

            if (propertyType == typeof(Guid))
            {
                string? stringGuid = GetStringFromJsonElement(value);

                if (!Guid.TryParse(stringGuid, out Guid valueparsed)) throw new CustomException(string.Format("Value {0} is not valid for {1}", value, field));

                return Expression.Constant(valueparsed, propertyType);
            }

            if (propertyType == typeof(string))
            {
                string? text = GetStringFromJsonElement(value);

                return Expression.Constant(text, propertyType);
            }

            if (propertyType == typeof(DateTime) || propertyType == typeof(DateTime?))
            {
                string? text = GetStringFromJsonElement(value);
                return Expression.Constant(ChangeType(text, propertyType), propertyType);
            }

            return Expression.Constant(ChangeType(((JsonElement)value).GetRawText(), propertyType), propertyType);
        }

        public static dynamic? ChangeType(object value, Type conversion)
        {
            var t = conversion;

            if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                {
                    return null;
                }

                t = Nullable.GetUnderlyingType(t);
            }

            return Convert.ChangeType(value, t!);
        }


    }
}
