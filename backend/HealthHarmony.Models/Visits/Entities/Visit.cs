using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Patients.Entities;
using HealthHarmony.Models.Visits.Enums;

namespace HealthHarmony.Models.Visits.Entities
{
    public class Visit : BaseModel
    {
        public virtual Doctor Doctor { get; set; }
        public Guid DoctorId { get; set; }
        public virtual Patient? Patient { get; set; }
        public Guid? PatientId { get; set; }
        public virtual Clinic Clinic { get; set; }
        public Guid ClinicId { get; set; }
        public VisitStatusEnum VisitStatus { get; set; }
        public TimeOnly StartHour { get; set; }
        public TimeOnly EndHour { get; set; }
        public DateTime VisitDate { get; set; }
        public bool IsRemote { get; set; }

    }
}
