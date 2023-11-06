namespace HealthHarmony.Models.Visits.Dto
{
    public class WeeklyWorkSchedule
    {
        public WeekdayWorkingHours Monday { get; set; }
        public WeekdayWorkingHours Tuesday { get; set; }
        public WeekdayWorkingHours Wednesday { get; set; }
        public WeekdayWorkingHours Thursday { get; set; }
        public WeekdayWorkingHours Friday { get; set; }
        public WeekdayWorkingHours Saturday { get; set; }
        public WeekdayWorkingHours Sunday { get; set; }
    }
}
