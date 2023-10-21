using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.Models.Addresses.Entities;

namespace HealthHarmony.Models.Clinics.Filters
{
    public class ClinicsFilters : BasePaginationFilters
    {
        public string? Name { get; set; }
    }
}
