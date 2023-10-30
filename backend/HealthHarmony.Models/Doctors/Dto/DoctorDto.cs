using HealthHarmony.Common.Models.Base;
using HealthHarmony.Models.Clinics.Dto;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Common.Entities;

namespace HealthHarmony.Models.Doctors.Dto
{
    public class DoctorDto : BaseModel
    {
        public new Guid? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool AcceptsRemotely { get; set; }
        public List<SpecializationDto> Specializations { get; set; }
        public List<ClinicDto>? Clinics { get; set; }
        public List<Guid>? ClinicsIds { get; set; }
        public Guid? UserId { get; set; }
        public Image? Image { get; set; }
    }
}
