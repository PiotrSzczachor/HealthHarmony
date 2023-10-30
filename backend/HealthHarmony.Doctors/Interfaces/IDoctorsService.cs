using HealthHarmony.Common.Interfaces;
using HealthHarmony.Models.Doctors.Dto;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Doctors.Filters;

namespace HealthHarmony.Doctors.Interfaces
{
    public interface IDoctorsService : IBaseService<Doctor, DoctorDto, DoctorsFilters>
    {

    }
}
