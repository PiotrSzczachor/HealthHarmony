using HealthHarmony.Common.Interfaces;
using HealthHarmony.Models.Visits.Dto;
using HealthHarmony.Models.Visits.Entities;
using HealthHarmony.Models.Visits.Filters;

namespace HealthHarmony.Visits.Interfaces
{
    public interface IVisitsService : IBaseService<Visit, VisitDto, VisitsFilters>
    {
        Task<List<VisitsPerDay>> GetNumberOfAvaliableVisitsByDateRange(Guid specializationId, DateTime startDate, DateTime endDate);
        Task GenerateVisistsBasedOnSchedule(WeeklyWorkSchedule schedule, Guid doctorId);
        Task AddDoctorSchedule(WeeklyWorkSchedule schedule, string userId);
        Task<WeeklyWorkSchedule> GetDoctorSchedule(string userId);
        
    }
}
