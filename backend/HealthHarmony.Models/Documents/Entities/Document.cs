using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Patients.Entities;

namespace HealthHarmony.Models.Documents.Entities
{
    public class Document : BaseNamedModel
    {
        public byte[] Content { get; set; }
        public string Extension { get; set; }
        public virtual Patient Patient { get; set; }
        public Guid PatientId { get; set; }
        public virtual Doctor? Doctor { get; set; }
        public Guid? DoctorId { get; set; }
    }
}
