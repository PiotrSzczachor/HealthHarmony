using HealthHarmony.Common.Extensions;
using HealthHarmony.Common.Models.Base;
using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.SQL;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace HealthHarmony.SQLRepository.Implementation
{
    public class Repository : IRepository
    {
        private readonly HealthHarmonyContext _context;
        public Repository(HealthHarmonyContext context)
        {
            _context = context;
        }
        public async Task Add<T>(T entity) where T : BaseModel
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete<T>(Guid id) where T : BaseModel
        {
            var entity = await Get<T>(id);
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<T?> Get<T>(Guid id, params Expression<Func<T, object>>[] includes) where T : BaseModel
        {
            var query = _context.Set<T>().AsNoTracking().AsQueryable();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<T?> Get<T>(Expression<Func<T, bool>> filter) where T : BaseModel
        {
            return await _context.Set<T>()
                .AsNoTracking()
                .FirstOrDefaultAsync(filter);
        }

        public IQueryable<T> GetAll<T>() where T : BaseModel
        {
            return _context.Set<T>().AsNoTracking();
        }

        public IQueryable<T> GetAllWithIncludes<T>(params Expression<Func<T, object>>[] includes) where T : BaseModel
        {
            IQueryable<T> query = _context.Set<T>();
            return includes.Aggregate(query, (current, include) => current.Include(include));
        }

        public PagedList<T> GetPagedList<T>(BasePaginationFilters filters) where T : BaseModel
        {
            return GetAll<T>().Filter(filters).ToPagedList(filters);
        }

        public PagedList<T> GetPagedListWithIncludes<T>(BasePaginationFilters filters, params Expression<Func<T, object>>[] includes) where T : BaseModel
        {
            return GetAllWithIncludes(includes).Filter(filters).ToPagedList(filters);
        }

        public async Task Update<T>(T entity) where T : BaseModel
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
