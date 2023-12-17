using HealthHarmony.Common.Interfaces;
using HealthHarmony.Models.Documents.Dto;
using HealthHarmony.Models.Documents.Entities;
using HealthHarmony.Models.Documents.Filters;

namespace HealthHarmony.Documents.Interfaces
{
    public interface IDocumentsService : IBaseService<Document, Document, DocumentsFilters>
    {
        Task<List<Document>> GetDocumentsPrescribedByDoctor(string userId);
        Task<List<Document>> GetPatientDocuments(string userId);
    }
}
