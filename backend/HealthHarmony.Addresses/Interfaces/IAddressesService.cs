using HealthHarmony.Models.Addresses;
using HealthHarmony.Models.Addresses.Entities;

namespace HealthHarmony.Addresses.Interfaces
{
    public interface IAddressesService
    {
        Task<Coordinates> GetLatAndLong(Address address);
    }
}
