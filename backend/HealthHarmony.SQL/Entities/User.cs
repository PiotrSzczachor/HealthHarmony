using Microsoft.AspNetCore.Identity;

namespace HealthHarmony.SQL.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
