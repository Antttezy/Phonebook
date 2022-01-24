using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Task4.Data;

namespace Task4.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddApplicationDataContext(this IServiceCollection services, string connectionString)
        {
            return services.AddDbContext<ApplicationDataContext>(builder => builder.UseSqlServer(connectionString));
        }
    }
}
