using HealthHarmony.Documents.Interfaces;
using HealthHarmony.Models.Common.Pagination;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Documents.Entities;
using HealthHarmony.Models.Documents.Filters;
using HealthHarmony.Models.Patients.Entities;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.Documents.Services
{
    public class DocumentsService : IDocumentsService
    {
        private readonly IRepository _repository;
        public DocumentsService(IRepository repository)
        {
            _repository = repository;
        }
        public Task Add(Document item)
        {
            throw new NotImplementedException();
        }

        public Task Delete(Guid Id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Document>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<List<Document>> GetAllWithoutIncludes()
        {
            throw new NotImplementedException();
        }

        public Task<Document> GetById(Guid Id)
        {
            throw new NotImplementedException();
        }

        public Task<Document> GetByIdWithoutIncludes(Guid Id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Document>> GetDocumentsPrescribedByDoctor(string userId)
        {
            var doctor = await _repository.GetAll<Doctor>(x => x.Documents).FirstOrDefaultAsync(x => x.UserId == userId);
            if (doctor == null || doctor.Documents == null)
            {
                return new List<Document>();
            }
            return doctor.Documents.ToList();
        }

        public PagedList<Document> GetPagedList(DocumentsFilters filters)
        {
            throw new NotImplementedException();
        }

        public PagedList<Document> GetPagedListWithoutIncludes(DocumentsFilters filters)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Document>> GetPatientDocuments(string userId)
        {
            var patient = await _repository.GetAll<Patient>(x => x.Documents).FirstOrDefaultAsync(x => x.UserId == userId);
            if(patient == null)
            {
                return new List<Document>();
            }
            return patient.Documents.ToList();
        }

        public Task Update(Document item)
        {
            throw new NotImplementedException();
        }
    }
}
