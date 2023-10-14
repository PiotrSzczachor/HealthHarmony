using HealthHarmony.Clinics.Interfaces;
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

        [HttpGet("with-address")]
        public async Task<List<Clinic>> GetAllClinicsWithAddresses()
        {
            return await _clinicsService.GetAllClinicsWithAddresses();
        }

        [HttpGet("{id}")]
        public async Task<Clinic> GetClinicById(Guid id)
        {
            return await _clinicsService.GetClinicById(id);
        }

        [HttpGet("with-address/{id}")]
        public async Task<Clinic> GetClinicWithAddressById(Guid id)
        {
            return await _clinicsService.GetClinicWithAddressById(id);
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
    }
}
