using AutoMapper;
using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Models.Auth.Dto;

namespace HealthHarmony.Auth.Profiles
{
    public class UserProfiles : Profile
    {
        public UserProfiles() 
        {
            CreateMap<UserRegisterDto, User>();
            CreateMap<User, UserDto>();
        }
    }
}
