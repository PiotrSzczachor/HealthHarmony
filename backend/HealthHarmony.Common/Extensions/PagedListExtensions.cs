using HealthHarmony.Common.Models.Base;
using HealthHarmony.Common.Models.Pagination;
using System.ComponentModel;

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
                PropertyDescriptor? prop = TypeDescriptor.GetProperties(typeof(T)).Find(paginationFilters.OrderBy, false);
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
