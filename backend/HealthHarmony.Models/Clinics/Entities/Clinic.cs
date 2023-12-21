using HealthHarmony.Models.Addresses.Entities;
using HealthHarmony.Models.Common.Base;
using HealthHarmony.Models.Common.Entities;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Visits.Entities;

namespace HealthHarmony.Models.Clinics.Entities
{
    public class Clinic : BaseNamedModel
    {
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Guid AddressId { get; set; }
        public virtual Address Address { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<Doctor>? Doctors { get; set; }
        public virtual ICollection<DailySchedule>? DailySchedules { get; set; }
        public virtual ICollection<Visit>? Visits { get; set; }
    }
}
