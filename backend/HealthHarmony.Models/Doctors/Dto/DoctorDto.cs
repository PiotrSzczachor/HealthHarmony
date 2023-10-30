using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Common.Entities;
using HealthHarmony.Models.Doctors.Entities;

namespace HealthHarmony.Models.Doctors.Dto
{
    public class DoctorDto : BaseModel
    {
        public new Guid? Id { get; set; }
        public string FitrsName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool AcceptsRemotely { get; set; }
        public List<SpecializationDto> Specializations { get; set; }
        public List<Guid> ClinicsIds { get; set; }
        public Image? Image { get; set; }
    }
}
