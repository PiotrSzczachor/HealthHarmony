using System.ComponentModel.DataAnnotations;

namespace HealthHarmony.WebApi.Entities.Base
{
    public class BaseModel
    {
        [Key]
        Guid Id { get; set; }
    }
}
