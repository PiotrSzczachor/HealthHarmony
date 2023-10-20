using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.Models.Clinics.Entities;

namespace HealthHarmony.Clinics.Interfaces
{
    public interface IClinicsService
    {
        PagedList<Clinic> GetPagedClinicList(BasePaginationFilters filters);
        PagedList<Clinic> GetPagedClinicListWithoutIncludes(BasePaginationFilters filters);
        Task<List<Clinic>> GetAllClinics();
        Task<Clinic> GetClinicById(Guid Id);
        Task<List<Clinic>> GetAllClinicsWithoutAddresses();
        Task<Clinic> GetClinicWithoutAddressById(Guid Id);
        Task<List<Clinic>> GetAllClinicsWithoutImages();
        Task<Clinic> GetClinicWithoutImagesById(Guid Id);
        Task<List<Clinic>> GetAllClinicsWithoutIncludes();
        Task<Clinic> GetClinicWithoutIncludesById(Guid Id);
        Task AddClinic(Clinic clinic);
        Task UpdateClinic(Clinic clinic);
        Task DeleteClinic(Guid Id);
    }
}
