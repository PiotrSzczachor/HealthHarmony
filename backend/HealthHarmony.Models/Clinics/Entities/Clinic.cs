using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Addresses.Entities;

namespace HealthHarmony.Models.Clinics.Entities
{
    public class Clinic : BaseNamedModel
    {
        public virtual Address Address { get; set; }
    }
}
