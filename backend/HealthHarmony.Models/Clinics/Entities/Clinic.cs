using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Addresses.Entities;
using HealthHarmony.Models.Common.Entities;

namespace HealthHarmony.Models.Clinics.Entities
{
    public class Clinic : BaseNamedModel
    {
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Guid AddressId { get; set; }
        public virtual Address Address { get; set; }
        public virtual ICollection<Image> Images { get; set; }
    }
}
