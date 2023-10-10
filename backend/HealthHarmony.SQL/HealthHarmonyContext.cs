using HealthHarmony.Auth.Models;
using HealthHarmony.Models.Addresses.Entities;
using HealthHarmony.Models.Clinics.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.SQL
{
    public class HealthHarmonyContext : IdentityDbContext<User>
    {
        public HealthHarmonyContext(DbContextOptions<HealthHarmonyContext> options) : base(options)
        {

        }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Clinic> Clinics { get; set; }
    }
}
