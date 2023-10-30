using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Patients.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HealthHarmony.SQL.Configurations
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.HasOne(c => c.User)
                .WithOne()
                .HasForeignKey<Patient>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
