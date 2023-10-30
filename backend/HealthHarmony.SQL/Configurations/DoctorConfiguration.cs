using HealthHarmony.Models.Doctors.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HealthHarmony.SQL.Configurations
{
    public class DoctorConfiguration : IEntityTypeConfiguration<Doctor>
    {
        public void Configure(EntityTypeBuilder<Doctor> builder)
        {
            builder.HasOne(d => d.User)
                .WithOne()
                .HasForeignKey<Doctor>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(d => d.Image)
                .WithOne()
                .HasForeignKey<Doctor>(c => c.ImageId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
