using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.Doctors.Interfaces;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Clinics.Filters;
using HealthHarmony.Models.Doctors.Dto;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Doctors.Filters;
using Microsoft.AspNetCore.Mvc;

namespace HealthHarmony.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorsService _doctorsService;
        public DoctorsController(IDoctorsService doctorsService)
        {
            _doctorsService = doctorsService;
        }

        [HttpGet]
        public async Task<List<Doctor>> GetAllDoctors()
        {
            return await _doctorsService.GetAll();
        }

        [HttpGet("without-includes")]
        public async Task<List<Doctor>> GetAllDoctorsWithoutIncludes()
        {
            return await _doctorsService.GetAllWithoutIncludes();
        }

        [HttpGet("{id}")]
        public async Task<Doctor> GetDoctorById(Guid id)
        {
            return await _doctorsService.GetById(id);
        }

        [HttpGet("without-includes/{id}")]
        public async Task<Doctor> GetDoctorByIdWithoutIncludes(Guid id)
        {
            return await _doctorsService.GetByIdWithoutIncludes(id);
        }

        [HttpGet("pagin")]
        public PagedList<Doctor> GetPagedDoctorsList([FromQuery] DoctorsFilters filter)
        {
            return _doctorsService.GetPagedList(filter);
        }

        [HttpGet("pagin/without-includes")]
        public PagedList<Doctor> GetPagedDoctorsListWithoutIncludes([FromQuery] DoctorsFilters filter)
        {
            return _doctorsService.GetPagedListWithoutIncludes(filter);
        }

        [HttpPost]
        public async Task AddDoctor([FromBody] DoctorDto doctor)
        {
            await _doctorsService.Add(doctor);
        }

        [HttpDelete("{id}")]
        public async Task DeleteDoctor(Guid id)
        {
            await _doctorsService.Delete(id);
        }

        [HttpPut]
        public async Task UpdateDoctor([FromBody] DoctorDto doctor)
        {
            await _doctorsService.Update(doctor);
        }

        [HttpGet("specializations")]
        public async Task<List<Specialization>> GetAllSpecializations()
        {
            return await _doctorsService.GetAllSpecializations();
        }
    }
}
