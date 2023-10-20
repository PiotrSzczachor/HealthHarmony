using System.Reflection;

namespace HealthHarmony.Common.Extensions
{
    public static class FilterExtensions
    {
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
                var value = property.GetValue(source, null);
                if (value == null) 
                {
                    continue;
                }
                var filterPropetryType = value.GetType();
                var filterValueAsString = value.ToString();
                source = source.FilterByProperty(name, filterValueAsString, filterPropetryType);
            }
            return source;
        }

        public static IQueryable<T> FilterByProperty<T, TValue>(this IQueryable<T> source, string propertyName, TValue filterValue, Type filterValueType)
        {
            if (filterValue == null)
            {
                return source;
            }

            var propertyType = typeof(T);
            var propertyInfo = filterValueType.GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Public);
            if (propertyInfo == null)
            {
                throw new ArgumentException($"There is no property {propertyName}");
            }
            //TODO
            //Check propertyInfo.PropertyType() and filter by specific value
            throw new NotImplementedException();
        }
    }
}
