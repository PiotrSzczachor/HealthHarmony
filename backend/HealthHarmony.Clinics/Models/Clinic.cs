using HealthHarmony.Addresses.Models;
using HealthHarmony.Common.Models;
using HealthHarmony.Common.Models.Base;

namespace HealthHarmony.Clinics.Models
{
    public class Clinic : BaseNamedModel
    {
        public Address Address { get; set; }
    }
}
