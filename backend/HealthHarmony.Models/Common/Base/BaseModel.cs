using System.ComponentModel.DataAnnotations;

namespace HealthHarmony.Models.Common.Base
{
    public class BaseModel
    {
        [Key]
        public Guid Id { get; set; }
    }
}
