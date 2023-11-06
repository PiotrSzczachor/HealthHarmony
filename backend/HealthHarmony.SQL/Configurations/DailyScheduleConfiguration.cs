using HealthHarmony.Models.Visits.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace HealthHarmony.SQL.Configurations
{
    public class DailyScheduleConfiguration : IEntityTypeConfiguration<DailySchedule>
    {
        public void Configure(EntityTypeBuilder<DailySchedule> builder)
        {
            builder.HasOne(ds => ds.Clinic)
                .WithMany(c => c.DailySchedules)
                .HasForeignKey(ds => ds.ClinicId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(ds => ds.Doctor)
                .WithMany(c => c.DailySchedules)
                .HasForeignKey(ds => ds.DoctorId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(ds => new { ds.DoctorId, ds.Weekday })
                .IsUnique();
        }
    }
}
