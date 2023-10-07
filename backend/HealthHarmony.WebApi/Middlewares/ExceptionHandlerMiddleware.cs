using System.Net;
using System.Text.Json;

namespace HealthHarmony.WebApi.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                string errorDetails = JsonSerializer.Serialize(new ErrorDetails
                {
                    StatusCode = context.Response.StatusCode,
                    Message = ex.Message,
                    ExceptionType = ex.GetType().ToString()
                });

                await context.Response.WriteAsync(errorDetails);
            }
        }
    }
}
