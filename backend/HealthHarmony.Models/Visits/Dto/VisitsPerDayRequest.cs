namespace HealthHarmony.Models.Visits.Dto
{
    public class VisitsPerDayRequest
    {
        public int AddDays { get; set; }
        public Guid SpecializationId {  get; set; }
        public Guid? ClinicId { get; set; }
        public bool IsRemote { get; set; }
    }
}
