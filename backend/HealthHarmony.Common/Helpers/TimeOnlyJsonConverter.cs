using System.Text.Json.Serialization;
using System.Text.Json;
using System.Globalization;

namespace HealthHarmony.Common.Helpers
{
    public sealed class TimeOnlyJsonConverter : JsonConverter<TimeOnly>
    {
        public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var timeString = reader.GetString(); // Assuming the input is a JSON string representing time in "HH:MM" format

            if (TimeOnly.TryParseExact(timeString, "HH:mm", out var timeOnly))
            {
                return timeOnly;
            }
            else
            {
                // Handle the case where the string is not in the expected format
                throw new JsonException($"Invalid time format. Expected format: HH:mm. Actual value: {timeString}");
            }
        }

        public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
        {
            var isoDate = value.ToString("O");
            writer.WriteStringValue(isoDate);
        }
    }
}
