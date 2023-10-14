using HealthHarmony.Models.Clinics.Entities;

namespace HealthHarmony.Clinics.Interfaces
{
    public interface IClinicsService
    {
        Task<List<Clinic>> GetAllClinics();
        Task<Clinic> GetClinicById(Guid Id);
        Task<List<Clinic>> GetAllClinicsWithAddresses();
        Task<Clinic> GetClinicWithAddressById(Guid Id);
        Task AddClinic(Clinic clinic);
        Task UpdateClinic(Clinic clinic);
        Task DeleteClinic(Guid Id);
    }
}
