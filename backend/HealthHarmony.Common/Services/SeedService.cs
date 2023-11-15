using HealthHarmony.Common.Constants;
using HealthHarmony.Common.Interfaces;

using Microsoft.AspNetCore.Identity;

namespace HealthHarmony.Common.Services
{
    public class SeedService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public SeedService(RoleManager<IdentityRole> roleManager) 
        {
            _roleManager = roleManager;
        }
        public async Task SeedData()
        {
            var rolesCount = _roleManager.Roles.Count();
            if(rolesCount == 0)
            {
                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Roles.Admin,
                });

                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Roles.Doctor,
                });

                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Roles.Patient,
                });
            }
            
        }
    }
}
