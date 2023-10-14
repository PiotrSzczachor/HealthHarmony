using HealthHarmony.Addresses.Interfaces;
using HealthHarmony.Models.Addresses;
using HealthHarmony.Models.Addresses.Entities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace HealthHarmony.Addresses.Services
{
    public class AddressesService : IAddressesService
    {
        private readonly IConfiguration _configuration;
        public AddressesService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<Coordinates> GetLatAndLong(Address address)
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(GenerateUrl(address));

            if (response.IsSuccessStatusCode)
            {
                return await ExtractCoordinatesFromResponse(response);
            }
            else
            {
                throw new Exception("Faild to fetch geoapify data");
            }
        }

        private string GenerateUrl(Address address)
        {
            string apiUrl = _configuration.GetSection("Geoapify:ApiUrl").Value;
            string apiKey = _configuration.GetSection("Geoapify:Key").Value;
            string addressString = GenerateAddressString(address);
            return $"{apiUrl}?text={addressString}&apiKey={apiKey}";
        }

        private string GenerateAddressString(Address address)
        {
            return address.Street + " " +
                   address.BuildingNumber + " " +
                   address.PostalCode + " " +
                   address.City + " " +
                   address.Country;
        }

        private async Task<Coordinates> ExtractCoordinatesFromResponse(HttpResponseMessage response)
        {
            string responseString = await response.Content.ReadAsStringAsync();
            JObject json = JObject.Parse(responseString);

            JArray results = (JArray)json["features"];
            JObject firstResult = (JObject)results[0];
            JObject firstResultGeometry = (JObject)firstResult["geometry"];

            double latitude = (double)firstResultGeometry["coordinates"][1];
            double longitude = (double)firstResultGeometry["coordinates"][0];

            return new Coordinates { Latitude = latitude, Longitude = longitude };
        }
    }
}
