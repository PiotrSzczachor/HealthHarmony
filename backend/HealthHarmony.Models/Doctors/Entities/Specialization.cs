using HealthHarmony.Models.Common.Base;

namespace HealthHarmony.Models.Doctors.Entities
{
    public class Specialization : BaseNamedModel
    {
        public virtual ICollection<Doctor> Doctors { get; set; }
    }
}
