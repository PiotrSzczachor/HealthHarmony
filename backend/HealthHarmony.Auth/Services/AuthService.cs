using AutoMapper;
using HealthHarmony.Auth.DTOs.User;
using HealthHarmony.Auth.Interfaces;
using HealthHarmony.Auth.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthHarmony.Auth.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public AuthService(IConfiguration configuration, UserManager<User> userManager, IMapper mapper)
        {
            _configuration = configuration;
            _userManager = userManager;
            _mapper = mapper;
        }

        public string GenerateToken(List<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:Secret").Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                    issuer: _configuration.GetSection("JWT:ValidIssuer").Value,
                    audience: _configuration.GetSection("JWT:ValidAudience").Value,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60), //Token is valid for 60 minutes
                    signingCredentials: signinCredentials
                );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }

        public async Task<string?> Register(UserRegisterDto userDto)
        {
            return await CreateUser(userDto);
        }

        public async Task<string?> CreateUser(UserRegisterDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            user.UserName = user.Email.Split('@')[0];
            var result = await _userManager.CreateAsync(user, userDto.Password);
            if( result.Succeeded)
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim("userId", user.Id.ToString())
                };
                return GenerateToken(claims);
            } else
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }

        public async Task<string?> Login(UserLoginDto dto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
            if (user == null)
            {
                return null;
            }
            bool validationResult = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (validationResult)
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim("userId", user.Id.ToString())
                };
                return GenerateToken(claims);
            }
            return null;
        }
    }
}
