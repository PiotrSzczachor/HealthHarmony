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

        [HttpPost("schedule")]
        public async Task AddSchedule([FromBody] WeeklyWorkSchedule schedule)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == TokenClaims.UserId)?.Value;
            if (userId == null)
            {
                throw new ApplicationException("There is no user Id in token");
            }
            await _visitsService.AddDoctorSchedule(schedule, userId);
        }

        [HttpGet("schedule")]
        public async Task<WeeklyWorkSchedule> GetSchedule()
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == TokenClaims.UserId)?.Value;
            if (userId == null)
            {
                throw new ApplicationException("There is no user Id in token");
            }
            return await _visitsService.GetDoctorSchedule(userId);
        }

        [HttpGet("per-day")]
        public async Task<List<VisitsPerDay>> GetNumberOfAvaliableVisitsByDateRange([FromQuery] VisitsPerDayRequest request)
        {
            return await _visitsService.GetNumberOfAvaliableVisitsByDateRange(request.SpecializationId, request.ClinicId, request.StartDate, request.IsRemote, 6);
        }

        [HttpGet("avaliable")]
        public async Task<List<Visit>> GetAvaliableVisitsForSpecificDate([FromQuery] GetAvaliableVisitsForSpecificDayRequest request)
        {
            return await _visitsService.GetAvaliableVisitsForSpecificDate(request);
        }

        [HttpPatch("{visitId:Guid}/book")]
        public async Task<Visit> AssignVisitToPatient(Guid visitId)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == TokenClaims.UserId)?.Value;
            if (userId == null)
            {
                throw new ApplicationException("There is no user Id in token");
            }
            return await _visitsService.BookVisit(visitId, userId);
        }

        [HttpGet("taken")]
        public async Task<List<VisitCalendarEvent>> GetPatientTakenVisits()
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == TokenClaims.UserId)?.Value;
            if (userId == null)
            {
                throw new ApplicationException("There is no user Id in token");
            }
            return await _visitsService.GetPatientTakenVisits(userId);
        }

    }
}
