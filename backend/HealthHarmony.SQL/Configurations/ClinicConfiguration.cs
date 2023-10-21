using HealthHarmony.Models.Clinics.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HealthHarmony.SQL.Configurations
{
    class ClinicConfiguration : IEntityTypeConfiguration<Clinic>
    {
        public void Configure(EntityTypeBuilder<Clinic> builder)
        {
            builder.HasOne(c => c.Address)
                .WithOne()
                .HasForeignKey<Clinic>(c => c.AddressId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
