using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Addresses.Entities;
using HealthHarmony.Models.Common.Entities;
using HealthHarmony.Models.Doctors.Entities;

namespace HealthHarmony.Models.Clinics.Dto
{
    public class ClinicDto : BaseModel
    {
        public new Guid? Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Address Address { get; set; }
        public virtual List<Image> Images { get; set; }
    }
}
