using AutoMapper;
using HealthHarmony.Models.Visits.Dto;
using HealthHarmony.Models.Visits.Entities;

namespace HealthHarmony.Visits.Profiles
{
    public class VisitProfiles : Profile
    {
        public VisitProfiles() 
        {
            CreateMap<DailySchedule, WeekdayWorkingHours>();
            CreateMap<WeekdayWorkingHours, DailySchedule>();
        }
    }
}
