using HealthHarmony.Common.Models.Base;
using System.Linq.Expressions;

namespace HealthHarmony.SQLRepository.Interfaces
{
    public interface IRepository
    {
        IQueryable<T> GetAll<T>() where T : BaseModel;
        IQueryable<T> GetAllWithIncludes<T>(params Expression<Func<T, object>>[] includes) where T : BaseModel;
        Task<T> Get<T>(Guid id) where T : BaseModel;
        Task<T> Get<T>(Expression<Func<T, bool>> filter) where T : BaseModel;
        Task Add<T>(T entity) where T : BaseModel;
        Task Update<T>(T entity) where T : BaseModel;
        Task Delete<T>(Guid id) where T : BaseModel;
    }
}
