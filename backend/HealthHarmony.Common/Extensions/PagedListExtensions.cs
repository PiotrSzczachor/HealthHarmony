using HealthHarmony.Common.Models.Base;
using HealthHarmony.Common.Models.Pagination;
using System.ComponentModel;
using System.Reflection;

namespace HealthHarmony.Common.Extensions
{
    public static class PagedListExtensions
    {
        public static PagedList<T> ToPagedList<T>(this IQueryable<T> source, BasePaginationFilters paginationFilters) where T : BaseModel
        {
            var result = new PagedList<T>();
            result.TotalCount = source.Count();
            if(paginationFilters.OrderBy != null)
            {
                var prop = typeof(T).GetProperty(paginationFilters.OrderBy, BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Public | BindingFlags.FlattenHierarchy);
                if (prop == null) 
                {
                    throw new ArgumentException($"There is no {paginationFilters.OrderBy} property to order by");
                }
                if (paginationFilters.OrderDescending)
                {
                    source.OrderByDescending(x => prop.GetValue(x));
                } 
                else
                {
                    source.OrderBy(x => prop.GetValue(x));
                }
            }
            result.Items = source.Skip(paginationFilters.PageSize * paginationFilters.PageIndex).Take(paginationFilters.PageSize).ToList();
            result.PageSize = paginationFilters.PageSize;
            result.PageIndex = paginationFilters.PageIndex;
            result.PageCount = (int)Math.Ceiling((double)result.TotalCount / result.PageSize);
            return result;
        }
    }
}
