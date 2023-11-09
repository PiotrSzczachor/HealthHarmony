using HealthHarmony.Common.Constants;
using HealthHarmony.Models.Visits.Dto;
using HealthHarmony.Visits.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthHarmony.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        [HttpPost("per-day")]
        public async Task<List<VisitsPerDay>> GetNumberOfAvaliableVisitsByDateRange([FromBody] VisitsPerDayRequest request)
        {
            return await _visitsService.GetNumberOfAvaliableVisitsByDateRange(request.SpecializationId, request.StartDate, request.EndDate);
        }
    }
}
