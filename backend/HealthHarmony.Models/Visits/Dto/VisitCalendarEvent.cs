using HealthHarmony.Models.Visits.Entities;

namespace HealthHarmony.Models.Visits.Dto
{
    public class VisitCalendarEvent: Visit
    {
        public string Title { get; set; }
        public DateTime Start {  get; set; }
        public DateTime End { get; set; }

    }
}
