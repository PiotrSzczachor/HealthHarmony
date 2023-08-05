namespace HealthHarmony.WebApi.Middlewares
{
    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string ExceptionType { get; set; }
    }
}
