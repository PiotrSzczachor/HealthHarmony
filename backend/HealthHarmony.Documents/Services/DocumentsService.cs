using HealthHarmony.Common.Extensions;
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
        public async Task Add(Document item)
        {
            await _repository.Add(item);
        }

        public async Task Delete(Guid Id)
        {
            await _repository.Delete<Document>(Id);
        }

        public async Task<List<Document>> GetAll()
        {
            return await _repository.GetAll<Document>(x => x.Patient, x => x.Doctor).ToListAsync();
        }

        public async Task<List<Document>> GetAllWithoutIncludes()
        {
            return await _repository.GetAll<Document>().ToListAsync();
        }

        public async Task<Document> GetById(Guid Id)
        {
            return await _repository.Get<Document>(Id, x => x.Patient, x => x.Doctor);
        }

        public async Task<Document> GetByIdWithoutIncludes(Guid Id)
        {
            return await _repository.Get<Document>(Id);
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
            return _repository.GetAll<Document>(x => x.Doctor, x => x.Patient).ToPagedList(filters);
        }

        public PagedList<Document> GetPagedListWithoutIncludes(DocumentsFilters filters)
        {
            return _repository.GetAll<Document>().ToPagedList(filters);
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

        public async Task Update(Document item)
        {
            await _repository.Update(item);
        }
    }
}
