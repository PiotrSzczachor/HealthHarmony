using HealthHarmony.Models.Documents.Dto;

namespace HealthHarmony.Models.Visits.Dto
{
    public class CompleteVisitRequest
    {
        public Guid VisitId { get; set; }
        public DocumentDto Document { get; set; }
    }
}
