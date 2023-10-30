using Microsoft.AspNetCore.Identity;

namespace HealthHarmony.Models.Auth.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
