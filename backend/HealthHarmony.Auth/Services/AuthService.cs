using AutoMapper;
using HealthHarmony.Auth.DTOs.User;
using HealthHarmony.Auth.Interfaces;
using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HealthHarmony.SQLRepository.Interfaces;
using HealthHarmony.Models.Patients.Entities;
using HealthHarmony.Common.Constants;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace HealthHarmony.Auth.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public AuthService(IConfiguration configuration, UserManager<User> userManager, IMapper mapper, IRepository repository)
        {
            _configuration = configuration;
            _userManager = userManager;
            _mapper = mapper;
            _repository = repository;
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
                await _userManager.AddToRoleAsync(user, Roles.Patient);
                await GeneratePatientForUser(user, userDto.PhoneNumber, userDto.BirthDate, userDto.Pesel);
                var roles = await _userManager.GetRolesAsync(user);
                var rolesString = JsonConvert.SerializeObject(roles);
                List<Claim> claims = new List<Claim>
                {
                    new Claim("userId", user.Id.ToString()),
                    new Claim("roles", rolesString)
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
                var roles = await _userManager.GetRolesAsync(user);
                var rolesString = JsonConvert.SerializeObject(roles);
                List<Claim> claims = new List<Claim>
                {
                    new Claim("userId", user.Id.ToString()),
                    new Claim("roles", rolesString),
                };
                return GenerateToken(claims);
            }
            return null;
        }

        public async Task<UserDto?> GetUser(Guid id)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Id == id.ToString());
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task DeleteUser(string userId)
        {
            var user = await _userManager.Users.SingleAsync(x => x.Id == userId);
            await _userManager.DeleteAsync(user);
        }

        public async Task DeleteUserByEmail(string email)
        {
            var user = await _userManager.Users.SingleAsync(x => x.Email == email);
            await _userManager.DeleteAsync(user);
        }

        private async Task GeneratePatientForUser(User user, string phoneNumber, DateTime birthDate, string pesel)
        {
            var patient = new Patient
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                User = user,
                UserId = user.Id,
                BirthDate = birthDate.ToUniversalTime(),
                PhoneNumber = phoneNumber,
                Pesel = pesel
            };
            await _repository.Add(patient);
        }
    }
}
