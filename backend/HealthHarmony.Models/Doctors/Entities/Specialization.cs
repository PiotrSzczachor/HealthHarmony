using HealthHarmony.Models.Common.Base;
using System.Text.Json.Serialization;

namespace HealthHarmony.Models.Doctors.Entities
{
    public class Specialization : BaseNamedModel
    {
        [JsonIgnore]
        public virtual ICollection<Doctor> Doctors { get; set; }
    }
}
