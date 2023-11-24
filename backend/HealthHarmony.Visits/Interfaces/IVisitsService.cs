using HealthHarmony.Common.Interfaces;
using HealthHarmony.Models.Visits.Dto;
using HealthHarmony.Models.Visits.Entities;
using HealthHarmony.Models.Visits.Filters;

namespace HealthHarmony.Visits.Interfaces
{
    public interface IVisitsService : IBaseService<Visit, VisitDto, VisitsFilters>
    {
        Task<List<VisitsPerDay>> GetNumberOfAvaliableVisitsByDateRange(Guid specializationId, Guid? clinicId, int addDays, bool isRemote, int numberOfDays);
        Task<List<Visit>> GetAvaliableVisitsForSpecificDate(GetAvaliableVisitsForSpecificDayRequest request);
        Task GenerateVisistsBasedOnSchedule(WeeklyWorkSchedule schedule, Guid doctorId);
        Task AddDoctorSchedule(WeeklyWorkSchedule schedule, string userId);
        Task<WeeklyWorkSchedule?> GetDoctorSchedule(string userId);
        Task UpdateDoctorSchedule(string userId, WeeklyWorkSchedule schedule);
        Task<Visit> BookVisit(BookVisitRequest request, string userId);
        Task<List<VisitCalendarEvent>> GetPatientTakenVisits(string userId);
        Task<List<VisitCalendarEvent>> GetTakenVisitsAssignedToDoctor(string userId);
    }
}
