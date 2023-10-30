using HealthHarmony.Auth.DTOs.User;
using HealthHarmony.Models.Auth;
using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Models.Doctors.Entities;
using System.Security.Claims;

namespace HealthHarmony.Auth.Interfaces
{
    public interface IAuthService
    {
        public string GenerateToken(List<Claim> claims);
        public Task<string?> Register(UserRegisterDto dto);
        public Task<string?> CreateUser(UserRegisterDto dto);
        public Task<string?> Login(UserLoginDto dto);
        public Task<UserDto?> GetUser(Guid id);
        Task<User> CreateUserForDoctor(Doctor doctor);
    }
}
