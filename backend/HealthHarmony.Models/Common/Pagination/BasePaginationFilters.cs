namespace HealthHarmony.Models.Common.Pagination
{
    public class BasePaginationFilters
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; } = 10;
        public string? OrderBy { get; set; }
        public bool OrderDescending { get; set; }
    }
}
