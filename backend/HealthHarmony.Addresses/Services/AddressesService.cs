using HealthHarmony.Addresses.Interfaces;
using HealthHarmony.Addresses.Models;

namespace HealthHarmony.Addresses.Services
{
    public class AddressesService : IAddressesService
    {
        private readonly HttpClient _httpClient;
        public async Task<Tuple<float, float>> GetLatAndLong(Address address)
        {
            throw new NotImplementedException();
        }
    }
}
