using HealthHarmony.Models.Common.Base;

namespace HealthHarmony.Models.Addresses.Entities
{
    public class Address : BaseModel
    {
        public string Street { get; set; }
        public string BuildingNumber { get; set; }
        public string? FlatNumber { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
