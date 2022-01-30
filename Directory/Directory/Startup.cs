using Directory.EFModels;
using Directory.Interfaces;
using Directory.Repository;
using Directory.Services.Token;
using Directory.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;
using System.Threading.Tasks;

namespace Directory
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

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Directory", Version = "v1" });
            });
            services.AddCors();

            services.AddAuthentication("OAuth")
            .AddJwtBearer("OAuth", config =>
            {
                var secretBytes = Encoding.UTF8.GetBytes(C.Secret);
                var key = new SymmetricSecurityKey(secretBytes);

                config.Events = new JwtBearerEvents()
                {
                    OnMessageReceived = context =>
                    {
                        if (context.Request.Query.ContainsKey("access_token"))
                        {
                            context.Token = context.Request.Query["access_token"];
                        }
                        return Task.CompletedTask;
                    }
                };

                config.TokenValidationParameters = new TokenValidationParameters()
                {
                    ClockSkew = TimeSpan.Zero,
                    ValidIssuer = C.Issuer,
                    ValidAudience = C.Audience,
                    IssuerSigningKey = key
                };
            });

            #region Services
            services.AddTransient<ITokenService, TokenService>();
            #endregion

            #region Repository
            services.AddTransient<IContactsRepository, ContactsRepository>();
            services.AddTransient<IRoleTypeRepository, RoleTypeRepository>();
            services.AddTransient<ITelephoneNumbersRepository, TelephoneNumbersRepository>();
            services.AddTransient<IUsersRepository, UsersRepository>();
            #endregion

            #region Connections
            services.AddDbContext<DirectoryContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Directory")));
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Directory v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication(); // Must be after UseRouting()

            app.UseAuthorization(); // Must be after UseAuthentication()

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseDefaultFiles(); // Parallel publicar y buscar Index.html etc

            app.UseStaticFiles(); // para publicar

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
