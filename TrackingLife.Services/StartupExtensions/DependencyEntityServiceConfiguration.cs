using Microsoft.Extensions.DependencyInjection;
using TrackingLife.Services.Identity.Registration;
using TrackingLife.Services.Identity.User;
using TrackingLife.Services.Services.AccountBalances;
using TrackingLife.Services.Services.Email;
using TrackingLife.Services.Services.Profiles;
using TrackingLife.Services.Services.Transactions;

namespace TrackingLife.Services.StartupExtensions
{
    /// <summary>
    /// Dependency injection configurator for entity services
    /// </summary>
    public static partial class DependencyСonfigurator
    {
        /// <summary>
        /// Add dependency injection for services
        /// </summary>
        /// <param name="services"></param>
        public static void AddEntityServices(this IServiceCollection services)
        {
            services.AddTransient<IRegistrationService, RegistrationService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IRazorViewToStringRenderer, RazorViewToStringRenderer>();
            services.AddTransient<IAccountBalancesService, AccountBalancesService>();
            services.AddTransient<ITransactionService, TransactionService>();
        }
    }
}
