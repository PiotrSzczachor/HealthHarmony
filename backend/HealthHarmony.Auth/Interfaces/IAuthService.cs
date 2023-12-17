using HealthHarmony.Auth.DTOs.User;
using HealthHarmony.Models.Auth;
using System.Security.Claims;

namespace HealthHarmony.Auth.Interfaces
{
    public interface IAuthService
    {
        string GenerateToken(List<Claim> claims);
        Task<string?> Register(UserRegisterDto dto);
        Task<string?> CreateUser(UserRegisterDto dto);
        Task<string?> Login(UserLoginDto dto);
        Task<UserDto?> GetUser(Guid id);
        Task DeleteUser(string userId);
        Task DeleteUserByEmail(string email);
    }
}
