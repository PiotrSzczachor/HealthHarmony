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
    }
}
