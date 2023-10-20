using HealthHarmony.Clinics.Interfaces;
using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.Models.Clinics.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HealthHarmony.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicsController : ControllerBase
    {
        private readonly IClinicsService _clinicsService;
        public ClinicsController(IClinicsService clinicsService)
        {
            _clinicsService = clinicsService;
        }

        [HttpGet]
        public async Task<List<Clinic>> GetAllClinics()
        {
            return await _clinicsService.GetAllClinics();
        }

        [HttpGet("{id}")]
        public async Task<Clinic> GetClinicById(Guid id)
        {
            return await _clinicsService.GetClinicById(id);
        }

        [HttpGet("without-address")]
        public async Task<List<Clinic>> GetAllClinicsWithoutAddresses()
        {
            return await _clinicsService.GetAllClinicsWithoutAddresses();
        }

        [HttpGet("without-address/{id}")]
        public async Task<Clinic> GetClinicWithoutAddressById(Guid id)
        {
            return await _clinicsService.GetClinicWithoutAddressById(id);
        }

        [HttpGet("without-images")]
        public async Task<List<Clinic>> GetAllClinicsWithoutImages()
        {
            return await _clinicsService.GetAllClinicsWithoutImages();
        }

        [HttpGet("without-images/{id}")]
        public async Task<Clinic> GetClinicWithoutImagesById(Guid id)
        {
            return await _clinicsService.GetClinicWithoutImagesById(id);
        }

        [HttpGet("without-includes")]
        public async Task<List<Clinic>> GetAllClinicsWithoutIncludes()
        {
            return await _clinicsService.GetAllClinicsWithoutIncludes();
        }

        [HttpGet("without-includes/{id}")]
        public async Task<Clinic> GetClinicWithoutIncludesById(Guid id)
        {
            return await _clinicsService.GetClinicWithoutIncludesById(id);
        }

        [HttpPost]
        public async Task AddClinic([FromBody] Clinic clinic)
        {
            await _clinicsService.AddClinic(clinic);
        }

        [HttpDelete("{id}")]
        public async Task DeleteClinic(Guid id)
        {
            await _clinicsService.DeleteClinic(id);
        }

        [HttpPut]
        public async Task UpdateClinic([FromBody] Clinic clinic)
        {
            await _clinicsService.UpdateClinic(clinic);
        }

        [HttpGet("pagin")]
        public PagedList<Clinic> GetPagedClinicList([FromQuery] BasePaginationFilters filter)
        {
            return _clinicsService.GetPagedClinicList(filter);
        }

        [HttpGet("pagin/without-includes")]
        public PagedList<Clinic> GetPagedClinicListWithoutIncludes([FromQuery] BasePaginationFilters filter)
        {
            return _clinicsService.GetPagedClinicListWithoutIncludes(filter);
        }
    }
}
