using System.Linq.Expressions;
using System.Reflection;

namespace HealthHarmony.Common.Extensions
{
    public static class FilterExtensions
    {
        private static readonly string[] PaginatorConnectedProperties = { "PageIndex", "PageSize", "OrderBy", "OrderDescending" };
        public static IQueryable<T> Filter<T, TFilter>(this IQueryable<T> source, TFilter filter)
        {
            if (filter == null)
            {
                return source;
            }

            Type type = filter.GetType();
            PropertyInfo[] properties = type.GetProperties();

            foreach (PropertyInfo property in properties)
            {
                var name = property.Name;
                var value = property.GetValue(filter, null);
                if (value == null || PaginatorConnectedProperties.Contains(name))
                {
                    continue;
                }
                var filterPropertyType = value.GetType();
                var filterValueAsString = value.ToString();
                source = source.FilterByProperty(name, filterValueAsString, filterPropertyType);
            }
            return source;
        }

        private static Expression<Func<T, bool>> GenerateEqualityExpression<T, TValue>(string propertyName, TValue filterValue)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyName);
            var body = Expression.Equal(property, Expression.Constant(filterValue));
            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }

        private static Expression<Func<T, bool>> GenerateContainsExpression<T, TValue>(string propertyName, TValue filterValue)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyName);
            var body = Expression.Call(property, "Contains", null, Expression.Constant(filterValue));
            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }

        private static Expression<Func<T, bool>> GenerateCaseInsensitiveContainsExpression<T, TValue>(string propertyName, TValue filterValue)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyName);

            MethodInfo toLowerMethod = typeof(string).GetMethod("ToLower", System.Type.EmptyTypes);
            var callToLower = Expression.Call(property, toLowerMethod);

            MethodInfo stringContainsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            var body = Expression.Call(callToLower, stringContainsMethod, Expression.Constant(filterValue.ToString().ToLower()));

            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }



        private static IQueryable<T> FilterByProperty<T, TValue>(this IQueryable<T> source, string propertyName, TValue filterValue, Type filterValueType)
        {
            if (filterValue == null)
            {
                return source;
            }
            
            var type = typeof(T);
            var propertyInfo = type.GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Public | BindingFlags.FlattenHierarchy);
            if (propertyInfo == null)
            {
                throw new ArgumentException($"There is no property {propertyName}");
            }

            if (propertyInfo.PropertyType == typeof(Guid))
            {
                var filterGuidValue = new Guid(filterValue.ToString());
                var lambda = GenerateEqualityExpression<T, Guid>(propertyName, filterGuidValue);
                return source.Where(lambda);
            }
            if (propertyInfo.PropertyType == typeof(List<Guid>))
            {
                var filterGuidListValue = (List<Guid>)Convert.ChangeType(filterValue, typeof(List<Guid>));
                var lambda = GenerateContainsExpression<T, List<Guid>>(propertyName, filterGuidListValue);
                return source.Where(lambda);
            }
            if (propertyInfo.PropertyType == typeof(bool))
            {
                var filterBoolValue = (bool)Convert.ChangeType(filterValue, typeof(bool));
                var lambda = GenerateEqualityExpression<T, bool>(propertyName, filterBoolValue);
                return source.Where(lambda);
            }
            if (propertyInfo.PropertyType == typeof(string))
            {
                var filterStringValue = (string)Convert.ChangeType(filterValue, typeof(string));
                var lambda = GenerateCaseInsensitiveContainsExpression<T, string>(propertyName, filterStringValue);
                return source.Where(lambda);
            }

            return source;
        }
    }
}
