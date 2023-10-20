using HealthHarmony.Common.Models.Base;

namespace HealthHarmony.Common.Models.Pagination
{
    public class PagedList<T> where T : BaseModel
    {
        public List<T> Items { get; set; } = new List<T>();
        public int PageIndex { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageCount { get; set; }
        public int TotalCount { get; set; }
    }
}
