using AutoMapper;
using HealthHarmony.WebApi.Entities;
using HealthHarmony.WebApi.Entities.Base;
using HealthHarmony.WebApi.Repository.Interfaces;

namespace HealthHarmony.WebApi.Repository.Implementation
{
    public class Repository : IRepository
    {
        private readonly HealthHarmonyContext _dbContext;
        private readonly IMapper _mapper;
        public Repository(HealthHarmonyContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public T Add<T>(T entity) where T : BaseModel
        {
            throw new NotImplementedException();
        }

        public void Delete<T>() where T : BaseModel
        {
            throw new NotImplementedException();
        }

        public T Get<T>(Guid id) where T : BaseModel
        {
            throw new NotImplementedException();
        }

        public T Get<T>(Func<T, bool> filter) where T : BaseModel
        {
            throw new NotImplementedException();
        }

        public List<T> GetAll<T>() where T : BaseModel
        {
            throw new NotImplementedException();
        }

        public void Update<T>() where T : BaseModel
        {
            throw new NotImplementedException();
        }
    }
}
