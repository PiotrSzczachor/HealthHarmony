using HealthHarmony.Common.Models.Base;
using HealthHarmony.Common.Models.Pagination;
using System.Linq.Expressions;

namespace HealthHarmony.SQLRepository.Interfaces
{
    public interface IRepository
    {
        IQueryable<T> GetAll<T>() where T : BaseModel;
        IQueryable<T> GetAll<T>(params Expression<Func<T, object>>[] includes) where T : BaseModel;
        PagedList<T> GetPagedList<T>(BasePaginationFilters filters) where T : BaseModel;
        PagedList<T> GetPagedList<T>(BasePaginationFilters filters, params Expression<Func<T, object>>[] includes) where T : BaseModel;
        Task<T> Get<T>(Guid id, params Expression<Func<T, object>>[] includes) where T : BaseModel;
        Task<T> Get<T>(Expression<Func<T, bool>> filter) where T : BaseModel;
        Task Add<T>(T entity) where T : BaseModel;
        Task Add<T>(List<T> entities) where T : BaseModel;
        Task Update<T>(T entity) where T : BaseModel;
        Task Update<T>(List<T> entities) where T : BaseModel;
        Task Delete<T>(Guid id) where T : BaseModel;
        Task Delete<T>(List<Guid> ids) where T : BaseModel;
    }
}
