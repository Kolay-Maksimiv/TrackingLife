using Microsoft.Extensions.DependencyInjection;
using TrackingLife.Data.Abstract.Email;
using TrackingLife.Data.Abstract.Repository;
using TrackingLife.Data.Domain.AccountBalances;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Data.Domain.Profiles;
using TrackingLife.Data.Domain.Transactions;

namespace TrackingLife.Services.StartupExtensions
{
    /// <summary>
    /// Dependency injection configurator for entity repositories
    /// </summary>
    public static partial class DependencyСonfigurator
    {
        /// <summary>
        /// Add dependency injection for repositories
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static void AddEntityRepositories(this IServiceCollection services)
        {
            services.AddTransient<IRepository<ApplicationUser>, Repository<ApplicationUser>>();
            services.AddTransient<IRepository<Profile>, Repository<Profile>>();
            services.AddTransient<IEmailRepository, EmailRepository>();
            services.AddTransient<IRepository<AccountBalance>, Repository<AccountBalance>>();
            services.AddTransient<IRepository<Transaction>, Repository<Transaction>>();
        }
    }
}
