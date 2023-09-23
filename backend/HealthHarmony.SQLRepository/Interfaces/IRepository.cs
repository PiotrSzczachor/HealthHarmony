using HealthHarmony.Common.Models.Base;
using System.Linq.Expressions;

namespace HealthHarmony.SQLRepository.Interfaces
{
    public interface IRepository<T> where T : BaseModel
    {
        IQueryable<T> GetAll();
        Task<T> Get(Guid id);
        Task<T> Get(Expression<Func<T, bool>> filter);
        Task Add(T entity);
        Task Update(T entity);
        Task Delete(Guid id);
    }
}
