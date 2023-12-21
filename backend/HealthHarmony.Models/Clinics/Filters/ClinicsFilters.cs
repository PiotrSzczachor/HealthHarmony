using HealthHarmony.Models.Addresses.Entities;
using HealthHarmony.Models.Common.Pagination;

namespace HealthHarmony.Models.Clinics.Filters
{
    public class ClinicsFilters : BasePaginationFilters
    {
        public string? Name { get; set; }
    }
}
