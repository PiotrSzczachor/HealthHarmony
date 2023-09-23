using System.ComponentModel.DataAnnotations;

namespace HealthHarmony.Common.Models.Base
{
    public class BaseModel
    {
        [Key]
        public Guid Id { get; set; }
    }
}
