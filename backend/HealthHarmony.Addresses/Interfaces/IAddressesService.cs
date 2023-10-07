using HealthHarmony.Addresses.Models;

namespace HealthHarmony.Addresses.Interfaces
{
    public interface IAddressesService
    {
        Task<Coordinates> GetLatAndLong(Address address);
    }
}
