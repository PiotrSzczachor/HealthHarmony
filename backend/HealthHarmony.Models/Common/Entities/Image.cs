using HealthHarmony.Models.Common.Base;

namespace HealthHarmony.Models.Common.Entities
{
    public class Image: BaseModel
    {
        public byte[] Content { get; set; }
        public string Extension { get; set; }
    }
}
