using Microsoft.AspNetCore.Builder;

namespace TrackingLife.Web.Api.Extensions.StartupExtensions.RuntimePipelineConfigurations
{ /// <summary>
    /// Runtime configuration builder for swagger
    /// </summary>
    public static partial class RuntimeConfigurationBuilder
    {
        /// <summary>
        /// Use runtime swagger builder
        /// </summary>
        /// <param name="applicationBuilder"></param>
        public static void UseRuntimeSwaggerBuilder(this IApplicationBuilder applicationBuilder)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            applicationBuilder.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            applicationBuilder.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tracking Life API V1");
                c.RoutePrefix = string.Empty;
            });
        }
    }
}