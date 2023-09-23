using HealthHarmony.Addresses.Models;

namespace HealthHarmony.Addresses.Interfaces
{
    public interface IAddressesService
    {
        Task<Tuple<float, float>> GetLatAndLong(Address address);
    }
}
