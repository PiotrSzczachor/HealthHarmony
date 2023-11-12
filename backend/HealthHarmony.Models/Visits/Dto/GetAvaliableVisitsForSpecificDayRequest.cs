namespace HealthHarmony.Models.Visits.Dto
{
    public class GetAvaliableVisitsForSpecificDayRequest
    {
        public DateTime VisitDate { get; set; }
        public Guid SpecializationId { get; set; }
        public Guid? ClinicId { get; set; }
        public bool IsRemote { get; set; }
    }
}
