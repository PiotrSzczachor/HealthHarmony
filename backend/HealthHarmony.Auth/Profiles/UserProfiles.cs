using AutoMapper;
using HealthHarmony.Auth.DTOs.User;
using HealthHarmony.SQL.Entities;

namespace HealthHarmony.Auth.Profiles
{
    public class UserProfiles : Profile
    {
        public UserProfiles() 
        {
            CreateMap<UserRegisterDto, User>();
        }
    }
}
