using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Task4.Core.Models;
using Task4.Core.Services;
using Task4.ExceptionHandling;
using Task4.Extensions;
using Task4.Interfaces;
using Task4.Services;

namespace Task4
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationDataContext(Configuration.GetConnectionString("SqliteContext"));
            services.AddScoped<IRepository<ContactGroup>, GroupRepository>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IRepository<PhonebookEntry>, PhonebookEntryRepository>();
            services.AddScoped<IPhonebookEntryService, PhonebookEntryService>();
            // services.AddTransient<IDatabaseSeeder<ContactGroup>, DatabaseSeeder<ContactGroup>>();

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.AddHealthChecks();
            services.AddCors(opts => opts.AddDefaultPolicy(builder =>
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors();

            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    IResponseFactory factory = new ObjectResponseFactory();
                    await factory.SendAsync(context);
                });
            });


            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/status");
                endpoints.MapControllers();
            });
        }
    }
}
