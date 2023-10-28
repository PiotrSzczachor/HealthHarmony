using AutoMapper;
using HealthHarmony.Auth.DTOs.User;
using HealthHarmony.Auth.Models;
using HealthHarmony.Models.Auth;

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
