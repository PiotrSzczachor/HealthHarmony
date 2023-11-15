using HealthHarmony.Auth.DTOs.User;
using HealthHarmony.Auth.Interfaces;
using HealthHarmony.Models.Auth;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
        {
            var token = await _authService.Register(dto);
            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            var token = await _authService.Login(dto);
            return token == null ? Unauthorized() : Ok(new { token });
        }

        [Authorize]
        [HttpGet("users/{id}")]
        public async Task<UserDto?> GetUser(Guid id)
        {
            return await _authService.GetUser(id);
        }
    }
}
