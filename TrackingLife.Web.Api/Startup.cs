using AutoMapper;
using IdentityServer4.AccessTokenValidation;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using TrackingLife.Data.Extensions;
using TrackingLife.Data.Interfaces;
using TrackingLife.Services.StartupExtensions;
using TrackingLife.Web.Api.Extensions;
using TrackingLife.Web.Api.Extensions.StartupExtensions.RuntimePipelineConfigurations;
using TrackingLife.Web.Api.Infrastructure;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace TrackingLife.Web.Api
{
    /// <summary>
    /// Startup project
    /// </summary>
    public class Startup
    {
        private readonly string CorsPolicyName = "TrackingLifeCorsPolicy";

        /// <summary>
        /// Configuration startup project
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Inject project configuration
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            // Add Database Context
            services.AddDatabase(Configuration);

            // Add swagger configuration
            services.AddSwaggerConfiguration();

            // Add Identity 
            services.AddIdentityConfiguration(Configuration);

            // JWT configuration
            services.AddAuthenticationConfiguration(Configuration);

            // Configure web config 
            services.AddWebConfiguration();

            // Add entity repository config
            services.AddEntityRepositories();

            // Add entity services config
            services.AddEntityServices();

            // Add accessor to HttpContext
            services.AddHttpContextAccessor();

            // Add services for localization
            services.AddLocalization();

            // Add auto mapper 
            var assemblies = Assembly
                .GetEntryAssembly()
                ?.GetReferencedAssemblies()
                .Select(Assembly.Load).ToList();

            assemblies.Add(Assembly.GetExecutingAssembly());

            services.AddTransient<IWorkContext, WebWorkContext>();

            try
            {
                services.AddAutoMapper(assemblies);

                //The code that causes the error goes here.
            }
            catch (ReflectionTypeLoadException ex)
            {
                StringBuilder sb = new StringBuilder();
                foreach (Exception exSub in ex.LoaderExceptions)
                {
                    sb.AppendLine(exSub.Message);
                    FileNotFoundException exFileNotFound = exSub as FileNotFoundException;
                    if (exFileNotFound != null)
                    {
                        if (!string.IsNullOrEmpty(exFileNotFound.FusionLog))
                        {
                            sb.AppendLine("Fusion Log:");
                            sb.AppendLine(exFileNotFound.FusionLog);
                        }
                    }
                    sb.AppendLine();
                }
                string errorMessage = sb.ToString();
                Console.WriteLine(errorMessage);
                //Display or log the error based on your application.
            }

            var allowedOrigins = new string[] {
                "http://localhost:44366",
                "https://localhost:44365"
            };

            services.AddSingleton<ICorsPolicyService>((container) =>
            {
                var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
                return new DefaultCorsPolicyService(logger)
                {
                    AllowedOrigins = allowedOrigins
                };
            });

            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicyName, builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });

            // Add mvc
            services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddRequirements(new AllowAccesForRemovedUser(true), new AllowAccesForUser(true))
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
                options.EnableEndpointRouting = false;
            });
            services.AddApplicationInsightsTelemetry();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AllowAccesForUser", policy =>
                    policy.Requirements.Add(new AllowAccesForUser(true)));

                options.AddPolicy("DenyAccesRemovedUser", policy =>
                    policy.Requirements.Add(new AllowAccesForRemovedUser(true)));
            });

            services.AddScoped<IAuthorizationHandler, IsActiveUserHandler>();

            services.AddScoped<IAuthorizationHandler, IsRemovedUserHandler>();

        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="applicationBuilder"></param>
        /// <param name="hostingEnvironment"></param>
        /// <param name="loggerFactory"></param>
        /// <param name="services"></param>
        public void Configure(IApplicationBuilder applicationBuilder,
            IWebHostEnvironment hostingEnvironment,
            ILoggerFactory loggerFactory,
            IServiceProvider services)
        {
            // Use logger factory
            loggerFactory.UseRuntimeLoggerBuilder(Configuration);

            // Use swagger
            applicationBuilder.UseRuntimeSwaggerBuilder();

            if (hostingEnvironment.IsDevelopment())
                applicationBuilder.UseDeveloperExceptionPage();

            applicationBuilder.UseStaticFiles();

            // Use IdentityServer
            applicationBuilder.UseIdentityServer();

            // Use Authentication
            applicationBuilder.UseAuthentication();

            applicationBuilder.UseCors(CorsPolicyName);

            applicationBuilder.UseMvcWithDefaultRoute();
        }
    }
}