using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;

namespace TrackingLife.Web.Api.Extensions
{
    /// <summary>
    /// Dependency injection configurator for swagger
    /// </summary>
    public static partial class DependencyСonfigurator
    {
        /// <summary>
        /// Add swagger configuration
        /// </summary>
        /// <param name="services"></param>
        public static void AddSwaggerConfiguration(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Tracking Life API",
                    Description = "Performance management system"
                });

            });
        }
    }
}
