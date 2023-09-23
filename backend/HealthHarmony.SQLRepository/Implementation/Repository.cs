using HealthHarmony.Common.Models.Base;
using HealthHarmony.SQL;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace HealthHarmony.SQLRepository.Implementation
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {
        private readonly HealthHarmonyContext _context;
        public Repository(HealthHarmonyContext context)
        {
            _context = context;
        }
        public async Task Add(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid id)
        {
            var entity = await Get(id);
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<T?> Get(Guid id)
        {
            return await _context.Set<T>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<T?> Get(Expression<Func<T, bool>> filter)
        {
            return await _context.Set<T>()
                .AsNoTracking()
                .FirstOrDefaultAsync(filter);
        }


        public IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsNoTracking();
        }

        public async Task Update(T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
