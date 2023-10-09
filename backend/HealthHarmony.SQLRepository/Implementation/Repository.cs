using HealthHarmony.Common.Models.Base;
using HealthHarmony.SQL;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace HealthHarmony.SQLRepository.Implementation
{
    public class Repository<T> : IRepository
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

        public async Task<T?> Get<T>(Guid id) where T : BaseModel
        {
            return await _context.Set<T>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
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

        public async Task Update<T>(T entity) where T : BaseModel
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
