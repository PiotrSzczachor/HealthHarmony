using HealthHarmony.Addresses.Interfaces;
using HealthHarmony.Clinics.Interfaces;
using HealthHarmony.Models.Addresses;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.Clinics.Services
{
    public class ClinicsService : IClinicsService
    {
        private readonly IRepository _repository;
        private readonly IAddressesService _addressesService;
        public ClinicsService(IRepository repository, IAddressesService addressesService)
        {
            _repository = repository;
            _addressesService = addressesService;
        }
        public async Task AddClinic(Clinic clinic)
        {
            Coordinates coordinates = await _addressesService.GetLatAndLong(clinic.Address);
            clinic.Address.Latitude = coordinates.Latitude;
            clinic.Address.Longitude = coordinates.Longitude;
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

        public async Task<Clinic> GetClinicWithAddressById(Guid Id)
        {
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Address).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task UpdateClinic(Clinic clinic)
        {
            await _repository.Update(clinic);
        }
    }
}
