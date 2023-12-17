using HealthHarmony.Common.Constants;
using HealthHarmony.Documents.Interfaces;
using HealthHarmony.Models.Documents.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthHarmony.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentsService _documentsService;
        public DocumentsController(IDocumentsService documentsService)
        {
            _documentsService = documentsService;
        }

        [HttpGet("doctor")]
        [Authorize(Roles = Roles.Doctor)]
        public async Task<List<Document>> GetDoctorDocuments()
        {
            var userId = GetUserId();
            return await _documentsService.GetDocumentsPrescribedByDoctor(userId);
        }

        [HttpGet("patient")]
        [Authorize(Roles = Roles.Patient)]
        public async Task<List<Document>> GetPatientDocuments()
        {
            var userId = GetUserId();
            return await _documentsService.GetPatientDocuments(userId);
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
