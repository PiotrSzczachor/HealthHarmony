using HealthHarmony.Addresses.Models;
using HealthHarmony.Common.Models.Base;
using HealthHarmony.SQLRepository.Interfaces;

namespace HealthHarmony.Clinics.Models
{
    public class Clinic : BaseNamedModel
    {
        public Address Address { get; set; }
    }
}
