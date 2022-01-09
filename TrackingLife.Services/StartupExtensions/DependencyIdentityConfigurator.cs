using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;
using System;
using TrackingLife.Data;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Services.Identity.Auth;
using TrackingLife.Services.Infrastructure;
using TrackingLife.Services.Infrastructureс;
using TrackingLife.Services.Installation;

namespace TrackingLife.Services.StartupExtensions
{
    /// <summary>
    /// Dependency injection configurator
    /// </summary>
    public static partial class DependencyСonfigurator
    {
        /// <summary>
        /// Add identity configuration
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void AddIdentityConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<RoleManager<ApplicationRole>>();

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                //Password Validator
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = false;
            })
               .AddEntityFrameworkStores<ApplicationDbContext>()
               .AddDefaultTokenProviders();

            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
                .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
                .AddInMemoryClients(IdentityServerConfig.GetClients())
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = builder => builder.UseSqlServer(configuration.GetConnectionString("AppConnection"), sql => sql.MigrationsAssembly("TrackingLife.Data"));
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = builder => builder.UseSqlServer(configuration.GetConnectionString("AppConnection"), sql => sql.MigrationsAssembly("TrackingLife.Data"));

                    // this enables automatic token cleanup. this is optional. 
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30;
                })
                .AddAspNetIdentity<ApplicationUser>()
                .AddProfileService<ProfileService>();

            IdentityModelEventSource.ShowPII = true;

            services.AddTransient<IApplicationDbContext, ApplicationDbContext>();
            services.AddTransient<ISeedSerivce, SeedService>();
        }
    }
}
