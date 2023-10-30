using AutoMapper;
using HealthHarmony.Addresses.Interfaces;
using HealthHarmony.Clinics.Interfaces;
using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.Models.Addresses;
using HealthHarmony.Models.Clinics.Dto;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Clinics.Filters;
using HealthHarmony.Models.Common.Entities;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.Clinics.Services
{
    public class ClinicsService : IClinicsService
    {
        private readonly IRepository _repository;
        private readonly IAddressesService _addressesService;
        private readonly IMapper _mapper;
        public ClinicsService(IRepository repository, IAddressesService addressesService, IMapper mapper)
        {
            _repository = repository;
            _addressesService = addressesService;
            _mapper = mapper;
        }
        public async Task Add(ClinicDto clinicDto)
        {
            Clinic clinic = _mapper.Map<Clinic>(clinicDto); 
            Coordinates coordinates = await _addressesService.GetLatAndLong(clinic.Address);
            clinic.Address.Latitude = coordinates.Latitude;
            clinic.Address.Longitude = coordinates.Longitude;
            await _repository.Add(clinic);
        }

        public async Task Delete(Guid Id)
        {
            await _repository.Delete<Clinic>(Id);
        }

        public async Task<Clinic> GetById(Guid Id)
        {
            return await _repository.GetAll<Clinic>(x => x.Address, x => x.Images, x => x.Doctors).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<List<Clinic>> GetAll()
        {
            return await _repository.GetAll<Clinic>(x => x.Address, x => x.Images, x => x.Doctors).ToListAsync();
        }

        public async Task<List<Clinic>> GetAllWithoutIncludes()
        {
            return await _repository.GetAll<Clinic>().ToListAsync();
        }

        public async Task<Clinic> GetByIdWithoutIncludes(Guid Id)
        {
            return await _repository.Get<Clinic>(Id);
        }

        public async Task<List<Clinic>> GetAllClinicsWithoutImages()
        {
            return await _repository.GetAll<Clinic>(x => x.Address, x => x.Doctors).ToListAsync();
        }

        public async Task<Clinic> GetClinicWithoutImagesById(Guid Id)
        {
            return await _repository.GetAll<Clinic>(x => x.Address).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<List<Clinic>> GetAllClinicsWithoutAddresses()
        {
            return await _repository.GetAll<Clinic>(x => x.Images, x => x.Doctors).ToListAsync();
        }

        public async Task<Clinic> GetClinicWithoutAddressById(Guid Id)
        {
            return await _repository.GetAll<Clinic>(x => x.Images).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task Update(ClinicDto clinicDto)
        {
            Coordinates coordinates = await _addressesService.GetLatAndLong(clinicDto.Address);
            clinicDto.Address.Latitude = coordinates.Latitude;
            clinicDto.Address.Longitude = coordinates.Longitude;

            var outdatedClinic = await _repository.Get<Clinic>((Guid)clinicDto.Id, x => x.Images);
            var clinic = _mapper.Map<Clinic>(clinicDto);
            await _repository.Update(clinic);
            var updatedClinicImagesIds = clinic.Images.Select(x => x.Id);
            var imagesToRemoveIds = outdatedClinic.Images.Select(x => x.Id).Where(x => !updatedClinicImagesIds.Contains(x));
            foreach(var imageId in imagesToRemoveIds) 
            {
                await _repository.Delete<Image>(imageId);
            }
        }

        public PagedList<Clinic> GetPagedList(ClinicsFilters filters)
        {
            return _repository.GetPagedList<Clinic>(filters, x => x.Address, x => x.Images, x => x.Doctors);
        }

        public PagedList<Clinic> GetPagedListWithoutIncludes(ClinicsFilters filters)
        {
            return _repository.GetPagedList<Clinic>(filters);
        }
    }
}
