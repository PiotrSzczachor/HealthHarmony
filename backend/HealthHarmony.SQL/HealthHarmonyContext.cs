using HealthHarmony.SQL.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace HealthHarmony.SQL
{
    public class HealthHarmonyContext : IdentityDbContext<User>
    {
        public HealthHarmonyContext(DbContextOptions<HealthHarmonyContext> options) : base(options)
        {

        }
    }
}
