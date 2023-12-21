using HealthHarmony.Clinics.Interfaces;
using HealthHarmony.Models.Clinics.Dto;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Clinics.Filters;
using HealthHarmony.Models.Common.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthHarmony.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            return await _clinicsService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<Clinic> GetClinicById(Guid id)
        {
            return await _clinicsService.GetById(id);
        }

        /*[HttpGet("without-address")]
        public async Task<List<Clinic>> GetAllClinicsWithoutAddresses()
        {
            return await _clinicsService.GetAllClinicsWithoutAddresses();
        }

        [HttpGet("without-address/{id}")]
        public async Task<Clinic> GetClinicWithoutAddressById(Guid id)
        {
            return await _clinicsService.GetClinicWithoutAddressById(id);
        }*/

        [AllowAnonymous]
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

       /*[HttpGet("without-includes")]
        public async Task<List<Clinic>> GetAllClinicsWithoutIncludes()
        {
            return await _clinicsService.GetAllWithoutIncludes();
        }

        [HttpGet("without-includes/{id}")]
        public async Task<Clinic> GetClinicWithoutIncludesById(Guid id)
        {
            return await _clinicsService.GetByIdWithoutIncludes(id);
        }*/

        [HttpPost]
        public async Task AddClinic([FromBody] ClinicDto clinic)
        {
            await _clinicsService.Add(clinic);
        }

        [HttpDelete("{id}")]
        public async Task DeleteClinic(Guid id)
        {
            await _clinicsService.Delete(id);
        }

        [HttpPut]
        public async Task UpdateClinic([FromBody] ClinicDto clinic)
        {
            await _clinicsService.Update(clinic);
        }

        [HttpGet("pagin")]
        public PagedList<Clinic> GetPagedClinicList([FromQuery] ClinicsFilters filter)
        {
            return _clinicsService.GetPagedList(filter);
        }

/*        [HttpGet("pagin/without-includes")]
        public PagedList<Clinic> GetPagedClinicListWithoutIncludes([FromQuery] ClinicsFilters filter)
        {
            return _clinicsService.GetPagedListWithoutIncludes(filter);
        }*/
    }
}
