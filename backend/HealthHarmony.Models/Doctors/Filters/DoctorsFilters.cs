using HealthHarmony.Models.Common.Pagination;

namespace HealthHarmony.Models.Doctors.Filters
{
    public class DoctorsFilters : BasePaginationFilters
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool? AcceptsRemotely { get; set; }
    }
}
