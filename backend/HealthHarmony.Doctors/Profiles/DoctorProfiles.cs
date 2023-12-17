using AutoMapper;
using HealthHarmony.Models.Doctors.Dto;
using HealthHarmony.Models.Doctors.Entities;

namespace HealthHarmony.Doctors.Profiles
{
    public class DoctorProfiles : Profile
    {
        public DoctorProfiles()
        {
            CreateMap<DoctorDto, Doctor>();
            CreateMap<SpecializationDto, Specialization>();
        }
    }
}
