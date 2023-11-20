using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Visits.Enums;

namespace HealthHarmony.Models.Visits.Entities
{
    public class DailySchedule : BaseModel
    {
        public TimeOnly StartHour { get; set; }
        public TimeOnly EndHour { get; set; }
        public TimeSpan Duration { get; set; }
        public bool Remote { get; set; }
        public bool DayOff { get; set; }
        public WeekdaysEnum Weekday { get; set; }
        public virtual Clinic? Clinic { get; set; }
        public Guid? ClinicId { get; set; }
        public virtual Doctor Doctor { get; set; }
        public Guid DoctorId { get; set; }
    }
}
