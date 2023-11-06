using AutoMapper;
using HealthHarmony.Models.Clinics.Dto;
using HealthHarmony.Models.Clinics.Entities;

namespace HealthHarmony.Clinics.Profiles
{
    public class ClinicProfiles : Profile
    {
        public ClinicProfiles()
        {
            CreateMap<ClinicDto, Clinic>();
            CreateMap<Clinic, ClinicDto>();
        }
    }
}
