using HealthHarmony.Clinics.Interfaces;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.Clinics.Services
{
    public class ClinicsService : IClinicsService
    {
        private readonly IRepository _repository;
        public ClinicsService(IRepository repository)
        {
            _repository = repository;
        }
        public async Task AddClinic(Clinic clinic)
        {
            await _repository.Add(clinic);
        }

        public async Task DeleteClinic(Guid Id)
        {
            await _repository.Delete<Clinic>(Id);
        }

        public async Task<Clinic> GetClinicById(Guid Id)
        {
            return await _repository.Get<Clinic>(Id);
        }

        public async Task<List<Clinic>> GetAllClinics()
        {
            return await _repository.GetAll<Clinic>().ToListAsync();
        }

        public async Task<List<Clinic>> GetAllClinicsWithAddresses()
        {
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Address).ToListAsync();
        }

        public async Task<Clinic?> GetClinicWithAddressById(Guid Id)
        {
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Address).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task UpdateClinic(Clinic clinic)
        {
            await _repository.Update(clinic);
        }
    }
}
