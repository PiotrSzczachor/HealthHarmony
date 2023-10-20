using HealthHarmony.Addresses.Interfaces;
using HealthHarmony.Clinics.Interfaces;
using HealthHarmony.Common.Models.Pagination;
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
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Address, x => x.Images).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<List<Clinic>> GetAllClinics()
        {
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Address, x => x.Images).ToListAsync();
        }

        public async Task<List<Clinic>> GetAllClinicsWithoutIncludes()
        {
            return await _repository.GetAll<Clinic>().ToListAsync();
        }

        public async Task<Clinic> GetClinicWithoutIncludesById(Guid Id)
        {
            return await _repository.Get<Clinic>(Id);
        }

        public async Task<List<Clinic>> GetAllClinicsWithoutImages()
        {
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Address).ToListAsync();
        }

        public async Task<Clinic> GetClinicWithoutImagesById(Guid Id)
        {
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Address).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<List<Clinic>> GetAllClinicsWithoutAddresses()
        {
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Images).ToListAsync();
        }

        public async Task<Clinic> GetClinicWithoutAddressById(Guid Id)
        {
            return await _repository.GetAllWithIncludes<Clinic>(x => x.Images).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task UpdateClinic(Clinic clinic)
        {
            await _repository.Update(clinic);
        }

        public PagedList<Clinic> GetPagedClinicList(BasePaginationFilters filters)
        {
            return _repository.GetPagedListWithIncludes<Clinic>(filters, x => x.Address, x => x.Images);
        }

        public PagedList<Clinic> GetPagedClinicListWithoutIncludes(BasePaginationFilters filters)
        {
            return _repository.GetPagedList<Clinic>(filters);
        }
    }
}
