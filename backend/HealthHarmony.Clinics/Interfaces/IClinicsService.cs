using HealthHarmony.Common.Interfaces;
using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.Models.Clinics.Dto;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Clinics.Filters;

namespace HealthHarmony.Clinics.Interfaces
{
    public interface IClinicsService : IBaseService<Clinic, ClinicDto, ClinicsFilters>
    {
        Task<List<Clinic>> GetAllClinicsWithoutAddresses();
        Task<Clinic> GetClinicWithoutAddressById(Guid Id);
        Task<List<Clinic>> GetAllClinicsWithoutImages();
        Task<Clinic> GetClinicWithoutImagesById(Guid Id);
    }
}
