using HealthHarmony.Models.Visits.Enums;

namespace HealthHarmony.Models.Visits.Dto
{
    public class WeekdayWorkingHours
    {
        public TimeOnly StartHour { get; set; }
        public TimeOnly EndHour { get; set; }
        public TimeSpan Duration { get; set; }
        public bool Remote { get; set; }
        public bool DayOff { get; set; }
        public Guid ClinicId { get; set; }
        public WeekdaysEnum Weekday {  get; set; }
    }
}
