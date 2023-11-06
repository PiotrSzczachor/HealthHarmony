namespace HealthHarmony.Models.Visits.Dto
{
    public class VisitsPerDayRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid SpecializationId {  get; set; }
    }
}
