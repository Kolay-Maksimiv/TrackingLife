using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TrackingLife.Services.Logging;

namespace TrackingLife.Web.Api.Extensions.StartupExtensions.RuntimePipelineConfigurations
{
    /// <summary>
    /// Runtime configuration builder for logger
    /// </summary>
    public static partial class RuntimeConfigurationBuilder
    {
        /// <summary>
        /// Use runtime logger builder
        /// </summary>
        /// <param name="loggerFactory"></param>
        /// <param name="configuration"></param>
        public static void UseRuntimeLoggerBuilder(this ILoggerFactory loggerFactory, IConfiguration configuration)
        {
            if (configuration.GetValue<bool>("EnableFileLogging"))
            {
                loggerFactory.AddFile("Logs");
            }

            if (configuration.GetValue<bool>("EnableDbLogging"))
            {
                loggerFactory.AddDatabase(LogLevel.Debug, configuration.GetConnectionString("LogsConnection"));
            }
        }
    }
}
