using HealthHarmony.Auth.Models;
using HealthHarmony.Models.Addresses.Entities;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Common.Entities;
using HealthHarmony.SQL.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.SQL
{
    public class HealthHarmonyContext : IdentityDbContext<User>
    {
        public HealthHarmonyContext(DbContextOptions<HealthHarmonyContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClinicConfiguration());
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Clinic> Clinics { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
