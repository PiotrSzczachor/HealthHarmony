using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Common.Entities;
using HealthHarmony.Models.Visits.Entities;

namespace HealthHarmony.Models.Doctors.Entities
{
    public class Doctor : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool AcceptsRemotely { get; set; }
        public virtual ICollection<Clinic> Clinics { get; set; }
        public virtual ICollection<Specialization> Specializations { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public Guid? ImageId { get; set; }
        public virtual Image? Image { get; set; }
        public virtual ICollection<DailySchedule>? DailySchedules { get; set; }
        public virtual ICollection<Visit>? Visits { get; set; }
    }
}
