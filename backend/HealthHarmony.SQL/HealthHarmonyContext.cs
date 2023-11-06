using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Models.Addresses.Entities;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Common.Entities;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.SQL.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using HealthHarmony.Models.Patients.Entities;
using HealthHarmony.Models.Visits.Entities;

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
            modelBuilder.ApplyConfiguration(new DoctorConfiguration());
            modelBuilder.ApplyConfiguration(new PatientConfiguration());
            modelBuilder.ApplyConfiguration(new SpecializationConfiguration());
            modelBuilder.ApplyConfiguration(new VisitConfiguration());
            modelBuilder.ApplyConfiguration(new DailyScheduleConfiguration());
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Clinic> Clinics { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Specialization> Specializations { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Visit> Visits { get; set; }
        public DbSet<DailySchedule> DailySchedules { get; set; }
    }
}
