using HealthHarmony.Common.Models.Base;
using HealthHarmony.Common.Models.Pagination;

namespace HealthHarmony.Common.Interfaces
{
    public interface IBaseService<T, TDto, TFilters> where T : BaseModel where TFilters : BasePaginationFilters where TDto : class
    {
        PagedList<T> GetPagedList(TFilters filters);
        PagedList<T> GetPagedListWithoutIncludes(TFilters filters);
        Task<List<T>> GetAll();
        Task<List<T>> GetAllWithoutIncludes();
        Task<T> GetById(Guid Id);
        Task<T> GetByIdWithoutIncludes(Guid Id);
        Task Add(TDto item);
        Task Update(TDto item);
        Task Delete(Guid Id);
    }
}
