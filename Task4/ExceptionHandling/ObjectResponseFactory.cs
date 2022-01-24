using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Task4.Core.Objects;

namespace Task4.ExceptionHandling
{
    public class ObjectResponseFactory : IResponseFactory
    {
        public async Task SendAsync(HttpContext context)
        {
            ErrorObject errorObject = ErrorFactory.GetError(context.Features.Get<IExceptionHandlerPathFeature>());
            context.Response.StatusCode = errorObject.ErrorCode;

            await context.Response.WriteAsJsonAsync(errorObject);
        }
    }
}
