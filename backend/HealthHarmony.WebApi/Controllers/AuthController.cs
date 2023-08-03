using HealthHarmony.Auth.DTOs.User;
using HealthHarmony.Auth.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHarmony.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<string?> Register([FromBody] UserRegisterDto dto)
        {
            return await _authService.Register(dto);
        }

        [HttpPost("login")]
        public async Task<string?> Login([FromBody] UserLoginDto dto)
        {
            return await _authService.Login(dto);
        }
    }
}
