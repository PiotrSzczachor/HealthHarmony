using System.Text.Json.Serialization;
using System.Text.Json;

namespace HealthHarmony.Common.Helpers
{
    public sealed class TimeOnlyJsonConverter : JsonConverter<TimeOnly>
    {
        public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            using (var jsonDoc = JsonDocument.ParseValue(ref reader))
            {
                var value = jsonDoc.RootElement;
                var hour = value.GetProperty("hour").GetInt32();
                var minute = value.GetProperty("minute").GetInt32();
                var second = value.GetProperty("second").GetInt32();

                return new TimeOnly(hour, minute, second);

            }
        }

        public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
        {
            var isoDate = value.ToString("O");
            writer.WriteStringValue(isoDate);
        }
    }
}
