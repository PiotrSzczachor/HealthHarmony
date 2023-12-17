using HealthHarmony.Common.Constants;
using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Models.Visits.Dto;
using HealthHarmony.Models.Visits.Entities;
using HealthHarmony.Visits.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthHarmony.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VisitsController : ControllerBase
    {
        private readonly IVisitsService _visitsService;
        public VisitsController(IVisitsService visitsService)
        {
            _visitsService = visitsService;
        }

        [Authorize(Roles = Roles.Doctor)]
        [HttpGet("{id}")]
        public async Task<Visit> GetVisitById(Guid id)
        {
            return await _visitsService.GetById(id);
        }

        [Authorize(Roles = Roles.Doctor)]
        [HttpPost("schedule")]
        public async Task AddSchedule([FromBody] WeeklyWorkSchedule schedule)
        {
            var userId = GetUserId();
            await _visitsService.AddDoctorSchedule(schedule, userId);
        }

        [Authorize(Roles = Roles.Doctor)]
        [HttpGet("schedule")]
        public async Task<WeeklyWorkSchedule?> GetSchedule()
        {
            var userId = GetUserId();
            return await _visitsService.GetDoctorSchedule(userId);
        }

        [Authorize(Roles = Roles.Doctor)]
        [HttpPut("schedule")]
        public async Task UpdateSchedule([FromBody] WeeklyWorkSchedule schedule)
        {
            var userId = GetUserId();
            await _visitsService.UpdateDoctorSchedule(userId, schedule);
        }

        [HttpGet("per-day")]
        public async Task<List<VisitsPerDay>> GetNumberOfAvaliableVisitsByDateRange([FromQuery] VisitsPerDayRequest request)
        {
            return await _visitsService.GetNumberOfAvaliableVisitsByDateRange(request.SpecializationId, request.ClinicId, request.AddDays, request.IsRemote, 6);
        }

        [HttpGet("avaliable")]
        public async Task<List<Visit>> GetAvaliableVisitsForSpecificDate([FromQuery] GetAvaliableVisitsForSpecificDayRequest request)
        {
            return await _visitsService.GetAvaliableVisitsForSpecificDate(request);
        }

        [HttpPatch("book")]
        public async Task<Visit> AssignVisitToPatient([FromBody] BookVisitRequest request)
        {
            var userId = GetUserId();
            return await _visitsService.BookVisit(request, userId);
        }

        [Authorize(Roles = Roles.Patient)]
        [HttpGet("taken")]
        public async Task<List<VisitCalendarEvent>> GetPatientTakenVisits()
        {
            var userId = GetUserId();
            return await _visitsService.GetPatientTakenVisits(userId);
        }

        [Authorize(Roles = Roles.Doctor)]
        [HttpGet("assigned")]
        public async Task<List<VisitCalendarEvent>> GetTakenVisitsAssignedToDoctor()
        {
            var userId = GetUserId();
            return await _visitsService.GetTakenVisitsAssignedToDoctor(userId);
        }

        [Authorize(Roles = Roles.Doctor)]
        [HttpPatch("complete")]
        public async Task CompleteVisit([FromBody] CompleteVisitRequest request)
        {
            var userId = GetUserId();
            await _visitsService.CompleteVisit(request);
        }

        private string GetUserId()
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == TokenClaims.UserId)?.Value;
            if (userId == null)
            {
                throw new ApplicationException("There is no user Id in token");
            }
            return userId;
        }

    }
}
