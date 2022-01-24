using Microsoft.AspNetCore.Diagnostics;
using Task4.Core.Exceptions;
using Task4.Core.Objects;

namespace Task4.ExceptionHandling
{
    public class ErrorFactory
    {
        public static ErrorObject GetError(IExceptionHandlerPathFeature exceptionHandlerPathFeature)
        {
            if (exceptionHandlerPathFeature == null)
                return null;

            if (exceptionHandlerPathFeature.Error is ApplicationException error)
            {
                int errCode = 400;

                if (error is NotFoundException)
                {
                    errCode = 404;
                }

                return new ErrorObject
                {
                    ErrorCode = errCode,
                    Description = error.Message
                };
            }
            else
            {
                return new ErrorObject
                {
                    ErrorCode = 500,
                    Description = "Unhandled exception in API"
                };
            }

        }
    }
}
