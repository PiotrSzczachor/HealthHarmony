namespace HealthHarmony.Models.Visits.Dto
{
    public class BookVisitRequest
    {
        public Guid VisitId { get; set; }
        public string? Symptoms { get; set; }
    }
}
