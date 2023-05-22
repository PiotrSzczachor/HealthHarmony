using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.WebApi.Entities
{
    public class HealthHarmonyContext : IdentityDbContext<User>
    {
        public HealthHarmonyContext(DbContextOptions<HealthHarmonyContext> options) : base(options)
        {

        }

    }
}
