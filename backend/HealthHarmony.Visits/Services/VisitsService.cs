using AutoMapper;
using HealthHarmony.Common.Extensions;
using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Patients.Entities;
using HealthHarmony.Models.Visits.Dto;
using HealthHarmony.Models.Visits.Entities;
using HealthHarmony.Models.Visits.Enums;
using HealthHarmony.Models.Visits.Filters;
using HealthHarmony.SQLRepository.Interfaces;
using HealthHarmony.Visits.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.Visits.Services
{
    public class VisitsService : IVisitsService
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        public VisitsService(IMapper mapper, IRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public async Task Add(VisitDto item)
        {
            var visit = _mapper.Map<Visit>(item);
            await _repository.Add(visit);
        }

        public async Task Delete(Guid id)
        {
            await _repository.Delete<Visit>(id);
        }

        public async Task<List<Visit>> GetAll()
        {
            return await _repository.GetAll<Visit>(x => x.Patient, x => x.Doctor, x => x.Clinic).ToListAsync();
        }

        public async Task<List<Visit>> GetAllWithoutIncludes()
        {
            return await _repository.GetAll<Visit>().ToListAsync();
        }

        public async Task<Visit> GetById(Guid Id)
        {
            var visit = await _repository.Get<Visit>(Id, x => x.Patient, x => x.Clinic);
            var doctorWithSpecialization = await _repository.Get<Doctor>(visit.DoctorId, x => x.Specializations);
            visit.Doctor = doctorWithSpecialization;
            return visit;
        }

        public async Task<Visit> GetByIdWithoutIncludes(Guid Id)
        {
            return await _repository.Get<Visit>(Id);
        }
        public PagedList<Visit> GetPagedList(VisitsFilters filters)
        {
            return _repository.GetAll<Visit>(x => x.Patient, x => x.Doctor, x => x.Clinic).ToPagedList(filters);
        }

        public PagedList<Visit> GetPagedListWithoutIncludes(VisitsFilters filters)
        {
            return _repository.GetAll<Visit>().ToPagedList(filters);
        }

        public async Task Update(VisitDto item)
        {
            throw new NotImplementedException();
        }
        public async Task<List<VisitsPerDay>> GetNumberOfAvaliableVisitsByDateRange(Guid specializationId, Guid? clinicId, int addDays, bool isRemote, int numberOfDays = 7)
        {
            List<VisitsPerDay> visitsPerDay = new List<VisitsPerDay>();
            DateTime startDate = DateTime.Today.AddDays(addDays);
            var endDate = startDate.AddDays(numberOfDays);
            var doctorsIds = await _repository.GetAll<Doctor>(x => x.Specializations).Where(x => x.Specializations.Any(x => x.Id == specializationId)).Select(x => x.Id).ToListAsync();
            for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
            {
                var baseQuery = _repository.GetAll<Visit>(x => x.Doctor).Where(x => x.VisitDate.Date == date.Date && x.VisitStatus == VisitStatusEnum.Avaliable && doctorsIds.Contains(x.DoctorId));
                int dailyCount = 0;
                if (isRemote)
                {
                    dailyCount = baseQuery.Where(x => x.IsRemote).Count();
                } else
                {
                    dailyCount = baseQuery.Where(x => x.ClinicId == clinicId).Count();
                }
                visitsPerDay.Add(new VisitsPerDay
                {
                    Date = date,
                    NumberOfVisits = dailyCount
                });
            }
            return visitsPerDay;
        }

        public async Task GenerateVisistsBasedOnSchedule(WeeklyWorkSchedule schedule, Guid doctorId)
        {
            var today = DateTime.Today;
            var endDate = today.AddDays(30);

            List<Visit> visits = new List<Visit>();
            for (DateTime date = today; date <= endDate; date = date.AddDays(1))
            {
                TimeOnly startHour = new TimeOnly();
                TimeOnly endHour = new TimeOnly();
                TimeSpan duration = new TimeSpan();
                Guid? clinicId = null;
                bool isRemote = false;
                bool dayOff = false;

                switch (date.DayOfWeek)
                {
                    case DayOfWeek.Monday:
                        startHour = schedule.Monday.StartHour;
                        endHour = schedule.Monday.EndHour;
                        duration = schedule.Monday.Duration;
                        clinicId = schedule.Monday.ClinicId == Guid.Empty ? null : schedule.Monday.ClinicId;
                        isRemote = schedule.Monday.Remote;
                        dayOff = schedule.Monday.DayOff;
                        break;
                    case DayOfWeek.Tuesday:
                        startHour = schedule.Tuesday.StartHour;
                        endHour = schedule.Tuesday.EndHour;
                        duration = schedule.Tuesday.Duration;
                        clinicId = schedule.Tuesday.ClinicId == Guid.Empty ? null : schedule.Tuesday.ClinicId;
                        isRemote = schedule.Tuesday.Remote;
                        dayOff = schedule.Tuesday.DayOff;
                        break;
                    case DayOfWeek.Wednesday:
                        startHour = schedule.Wednesday.StartHour;
                        endHour = schedule.Wednesday.EndHour;
                        duration = schedule.Wednesday.Duration;
                        clinicId = schedule.Wednesday.ClinicId == Guid.Empty ? null : schedule.Wednesday.ClinicId;
                        isRemote = schedule.Wednesday.Remote;
                        dayOff = schedule.Wednesday.DayOff;
                        break;
                    case DayOfWeek.Thursday:
                        startHour = schedule.Thursday.StartHour;
                        endHour = schedule.Thursday.EndHour;
                        duration = schedule.Thursday.Duration;
                        clinicId = schedule.Thursday.ClinicId == Guid.Empty ? null : schedule.Thursday.ClinicId;
                        isRemote = schedule.Thursday.Remote;
                        dayOff = schedule.Thursday.DayOff;
                        break;
                    case DayOfWeek.Friday:
                        startHour = schedule.Friday.StartHour;
                        endHour = schedule.Friday.EndHour;
                        duration = schedule.Friday.Duration;
                        clinicId = schedule.Friday.ClinicId == Guid.Empty ? null : schedule.Friday.ClinicId;
                        isRemote = schedule.Friday.Remote;
                        dayOff = schedule.Friday.DayOff;
                        break;
                    case DayOfWeek.Saturday:
                        startHour = schedule.Saturday.StartHour;
                        endHour = schedule.Saturday.EndHour;
                        duration = schedule.Saturday.Duration;
                        clinicId = schedule.Saturday.ClinicId == Guid.Empty ? null : schedule.Saturday.ClinicId;
                        isRemote = schedule.Saturday.Remote;
                        dayOff = schedule.Saturday.DayOff;
                        break;
                    case DayOfWeek.Sunday:
                        startHour = schedule.Sunday.StartHour;
                        endHour = schedule.Sunday.EndHour;
                        duration = schedule.Sunday.Duration;
                        clinicId = schedule.Sunday.ClinicId == Guid.Empty ? null : schedule.Sunday.ClinicId;
                        isRemote = schedule.Sunday.Remote;
                        dayOff = schedule.Sunday.DayOff;
                        break;
                }

                if (dayOff)
                {
                    continue;
                }

                for (TimeOnly time = startHour; time < endHour; time = time.AddMinutes(duration.Hours * 60 + duration.Minutes))
                {
                    visits.Add(new Visit
                    {
                        StartHour = time,
                        EndHour = time.AddMinutes(duration.Hours * 60 + duration.Minutes),
                        VisitDate = date,
                        IsRemote = isRemote,
                        DoctorId = doctorId,
                        ClinicId = clinicId,
                        VisitStatus = VisitStatusEnum.Avaliable
                    });
                }

            }
            await _repository.Add(visits);
        }

        public async Task AddDoctorSchedule(WeeklyWorkSchedule schedule, string userId)
        {
            var doctor = await _repository.Get<Doctor>(x => x.UserId == userId);
            if (doctor == null)
            {
                throw new ApplicationException("Coresponding doctor to this user not found");
            }
            var monday = await AddDailySchedule(schedule.Monday, doctor);
            var tuesday = await AddDailySchedule(schedule.Tuesday, doctor);
            var wednesday = await AddDailySchedule(schedule.Wednesday, doctor);
            var thursday = await AddDailySchedule(schedule.Thursday, doctor);
            var friday = await AddDailySchedule(schedule.Friday, doctor);
            var saturday = await AddDailySchedule(schedule.Saturday, doctor);
            var sunday = await AddDailySchedule(schedule.Sunday, doctor);
            List<DailySchedule> dailySchedules = new List<DailySchedule>
            {
                monday, tuesday, wednesday, thursday, friday, saturday, sunday
            };
            await _repository.Add(dailySchedules);
            await GenerateVisistsBasedOnSchedule(schedule, doctor.Id);
        }

        private async Task<DailySchedule> AddDailySchedule(WeekdayWorkingHours weekdayWorkingHours, Doctor doctor)
        {
            var dailySchedule = new DailySchedule
            {
                StartHour = weekdayWorkingHours.StartHour,
                EndHour = weekdayWorkingHours.EndHour,
                Duration = weekdayWorkingHours.Duration,
                Remote = weekdayWorkingHours.Remote,
                DayOff = weekdayWorkingHours.DayOff,
                Weekday = weekdayWorkingHours.Weekday,
                ClinicId = weekdayWorkingHours.ClinicId == Guid.Empty ? null : weekdayWorkingHours.ClinicId,
                DoctorId = doctor.Id,
            };
            return dailySchedule;
        }

        public async Task<WeeklyWorkSchedule?> GetDoctorSchedule(string userId)
        {
            var doctor = await _repository.GetAll<Doctor>(x => x.DailySchedules).FirstOrDefaultAsync(x => x.UserId == userId);
            if(doctor == null)
            {
                throw new ApplicationException("Coresponding user to this doctor not found");
            }
            if(doctor.DailySchedules == null || doctor.DailySchedules.Count == 0)
            {
                return null;
            }
            var monday = _mapper.Map<WeekdayWorkingHours>(doctor.DailySchedules.First(x => x.Weekday == WeekdaysEnum.Monday));
            var tuesday = _mapper.Map<WeekdayWorkingHours>(doctor.DailySchedules.First(x => x.Weekday == WeekdaysEnum.Tuesday));
            var wednesday = _mapper.Map<WeekdayWorkingHours>(doctor.DailySchedules.First(x => x.Weekday == WeekdaysEnum.Wednesday));
            var thursday = _mapper.Map<WeekdayWorkingHours>(doctor.DailySchedules.First(x => x.Weekday == WeekdaysEnum.Thursday));
            var friday = _mapper.Map<WeekdayWorkingHours>(doctor.DailySchedules.First(x => x.Weekday == WeekdaysEnum.Friday));
            var saturday = _mapper.Map<WeekdayWorkingHours>(doctor.DailySchedules.First(x => x.Weekday == WeekdaysEnum.Saturday));
            var sunday = _mapper.Map<WeekdayWorkingHours>(doctor.DailySchedules.First(x => x.Weekday == WeekdaysEnum.Sunday));
            return new WeeklyWorkSchedule
            {
                Monday = monday,
                Tuesday = tuesday,
                Wednesday = wednesday,
                Thursday = thursday,
                Friday = friday,
                Saturday = saturday,
                Sunday = sunday
            };
        }

        public async Task<List<Visit>> GetAvaliableVisitsForSpecificDate(GetAvaliableVisitsForSpecificDayRequest request)
        {
            List<Visit> results = new List<Visit>();
            request.VisitDate = request.VisitDate.ToUniversalTime();
            var doctorsIds = await _repository.GetAll<Doctor>(x => x.Specializations).Where(x => x.Specializations.Any(x => x.Id == request.SpecializationId)).Select(x => x.Id).ToListAsync();
            var baseQuery = _repository.GetAll<Visit>(x => x.Doctor, x => x.Clinic).Where(x => x.VisitDate.Date == request.VisitDate.Date && x.VisitStatus == VisitStatusEnum.Avaliable && doctorsIds.Contains(x.DoctorId));
            if (request.IsRemote)
            {
                baseQuery = baseQuery.Where(x => x.IsRemote);
            }
            else
            {
                baseQuery = baseQuery.Where(x => x.ClinicId == request.ClinicId);
            }
            results = await baseQuery.OrderBy(x => x.StartHour).ToListAsync();
            return results;
        }

        public async Task<Visit> BookVisit(BookVisitRequest request, string userId)
        {
            var patient = await _repository.Get<Patient>(x => x.UserId == userId);
            var visit = await _repository.Get<Visit>(request.VisitId);
            if(!string.IsNullOrEmpty(request.Symptoms))
            {
                visit.Symptoms = request.Symptoms;
            }
            visit.VisitStatus = VisitStatusEnum.Taken;
            visit.Patient = patient;
            visit.PatientId = patient.Id;
            await _repository.Update(visit);
            return visit;
        }

        public async Task<List<VisitCalendarEvent>> GetPatientTakenVisits(string userId)
        {
            var patient = await _repository.Get<Patient>(x => x.UserId == userId);
            var visits = await _repository.GetAll<Visit>(x => x.Doctor, x => x.Clinic).Where(x => x.VisitStatus == VisitStatusEnum.Taken && x.PatientId == patient.Id).ToListAsync();
            var visitCalendarEvents = _mapper.Map<List<VisitCalendarEvent>>(visits);
            for(int i = 0; i < visits.Count(); i++)
            {
                visitCalendarEvents[i].Title = visits[i].Doctor.FirstName + " " + visits[i].Doctor.LastName;
                visitCalendarEvents[i].Start = visits[i].VisitDate.AddHours(visits[i].StartHour.Hour).AddMinutes(visits[i].StartHour.Minute);
                visitCalendarEvents[i].End = visits[i].VisitDate.AddHours(visits[i].EndHour.Hour).AddMinutes(visits[i].EndHour.Minute);
            }
            return visitCalendarEvents;
        }

        public async Task<List<VisitCalendarEvent>> GetTakenVisitsAssignedToDoctor(string userId)
        {
            var doctor = await _repository.Get<Doctor>(x => x.UserId == userId);
            var visits = await _repository.GetAll<Visit>(x => x.Patient, x => x.Clinic).Where(x => x.VisitStatus == VisitStatusEnum.Taken && x.DoctorId == doctor.Id).ToListAsync();
            var visitCalendarEvents = _mapper.Map<List<VisitCalendarEvent>>(visits);
            for (int i = 0; i < visits.Count(); i++)
            {
                visitCalendarEvents[i].Title = visits[i].Patient?.FirstName + " " + visits[i].Patient?.LastName;
                visitCalendarEvents[i].Start = visits[i].VisitDate.AddHours(visits[i].StartHour.Hour).AddMinutes(visits[i].StartHour.Minute);
                visitCalendarEvents[i].End = visits[i].VisitDate.AddHours(visits[i].EndHour.Hour).AddMinutes(visits[i].EndHour.Minute);
            }
            return visitCalendarEvents;
        }

        public async Task UpdateDoctorSchedule(string userId, WeeklyWorkSchedule schedule)
        {
            var doctor = await _repository.GetAll<Doctor>(x => x.DailySchedules).FirstOrDefaultAsync(x => x.UserId == userId);
            if(doctor != null && doctor.DailySchedules != null)
            {
                var takenVisits = await _repository.GetAll<Visit>(x => x.Patient, x => x.Clinic).Where(x => x.VisitStatus == VisitStatusEnum.Taken && x.DoctorId == doctor.Id).ToListAsync();
                //TODO Notify patient that visit has been canceled
                foreach(var takenVisit in takenVisits)
                {
                    takenVisit.VisitStatus = VisitStatusEnum.Canceled;
                }
                await _repository.Update(takenVisits);
                var avaliableVisitsIds = await _repository.GetAll<Visit>().Where(x => x.VisitStatus == VisitStatusEnum.Avaliable && x.DoctorId == doctor.Id).Select(x => x.Id).ToListAsync();
                await _repository.Delete<Visit>(avaliableVisitsIds);
                var oldScheduleIds = doctor.DailySchedules.Select(x => x.Id).ToList();
                await _repository.Delete<DailySchedule>(oldScheduleIds);
                await AddDoctorSchedule(schedule, userId);
            }
        }
    }
}
