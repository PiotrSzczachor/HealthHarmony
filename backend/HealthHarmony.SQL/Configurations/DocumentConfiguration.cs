using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Documents.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HealthHarmony.SQL.Configurations
{
    public class DocumentConfiguration : IEntityTypeConfiguration<Document>
    {
        public void Configure(EntityTypeBuilder<Document> builder)
        {
            builder.HasOne(d => d.Patient)
                .WithMany(p => p.Documents)
                .HasForeignKey(v => v.PatientId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(d => d.Doctor)
                .WithMany(doctor => doctor.Documents)
                .HasForeignKey(v => v.DoctorId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
