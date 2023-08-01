using HealthHarmony.WebApi.Entities.Base;

namespace HealthHarmony.WebApi.Repository.Interfaces
{
    public interface IRepository
    {
        T Get<T>(Guid id) where T : BaseModel;
        T Get<T>(Func<T, bool> filter) where T : BaseModel;
        List<T> GetAll<T>() where T : BaseModel;
        T Add<T>(T entity) where T : BaseModel;
        void Delete<T>() where T : BaseModel;
        void Update<T>() where T : BaseModel;

    }
}
