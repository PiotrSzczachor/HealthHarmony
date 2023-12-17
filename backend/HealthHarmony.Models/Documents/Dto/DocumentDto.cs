using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Patients.Entities;

namespace HealthHarmony.Models.Documents.Dto
{
    public class DocumentDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public byte[] Content { get; set; }
        public string Extension { get; set; }
        public Guid PatientId { get; set; }
        public Guid? DoctorId { get; set; }
    }
}
