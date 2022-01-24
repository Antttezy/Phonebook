using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Task4.ExceptionHandling
{
    public interface IResponseFactory
    {
        Task SendAsync(HttpContext context);
    }
}
