using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Linq;
using Task4.Core.Models;
using Task4.Data;
using Task4.Interfaces;

namespace Task4
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IHost app = CreateHostBuilder(args).Build();

            using (IServiceScope scope = app.Services.CreateScope())
            {
                ApplicationDataContext context = scope.ServiceProvider.GetRequiredService<ApplicationDataContext>();

                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }

                //IDatabaseSeeder<ContactGroup> seeder = scope.ServiceProvider.GetRequiredService<IDatabaseSeeder<ContactGroup>>();
                //seeder.SeedAsync(new ContactGroup[]
                //{
                //    new()
                //    {
                //        Name = "Friends"
                //    },
                //    new()
                //    {
                //        Name = "Family"
                //    },
                //    new()
                //    {
                //        Name = "Colleagues"
                //    },
                //}).Wait();
            }

            app.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
