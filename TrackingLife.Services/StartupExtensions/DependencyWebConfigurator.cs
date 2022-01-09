using EasyCaching.InMemory;
using Microsoft.Extensions.DependencyInjection;
using TrackingLife.Services.Caching;
using TrackingLife.Services.Identity.Auth;
using TrackingLife.Services.Identity.Cache;

namespace TrackingLife.Services.StartupExtensions
{
    /// <summary>
    /// Dependency injection for web configurator
    /// </summary>
    public static partial class DependencyСonfigurator
    {
        /// <summary>
        /// Add web configuration
        /// </summary>
        /// <param name="services"></param>
        public static void AddWebConfiguration(this IServiceCollection services)
        {
            services.AddTransient<IAuthService, AuthService>();

            //Cache
            services.AddEasyCaching(option =>
            {
                // use memory cache with your own configuration
                option.UseInMemory(options =>
                {
                    options.DBConfig = new InMemoryCachingOptions
                    {
                        // scan time, default value is 60s
                        ExpirationScanFrequency = 60,
                        // total count of cache items, default value is 10000
                        SizeLimit = 1000
                    };
                    // the max random second will be added to cache's expiration, default value is 120
                    options.MaxRdSecond = 120;
                    // whether enable logging, default is false
                    options.EnableLogging = false;
                    // mutex key's alive time(ms), default is 5000
                    options.LockMs = 5000;
                    // when mutex key alive, it will sleep some time, default is 300
                    options.SleepMs = 300;
                }, "default");
            });

            services.AddSingleton<IStaticCacheManager, MemoryCacheManager>();
        }
    }
}
