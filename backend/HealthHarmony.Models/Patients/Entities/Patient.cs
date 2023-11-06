using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Models.Visits.Entities;

namespace HealthHarmony.Models.Patients.Entities
{
    public class Patient : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Visit>? Visits { get; set; }
    }
}
