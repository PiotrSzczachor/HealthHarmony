using Microsoft.AspNetCore.Identity;

namespace HealthHarmony.WebApi.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
