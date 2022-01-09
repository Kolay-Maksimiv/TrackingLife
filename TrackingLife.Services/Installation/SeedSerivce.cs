using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;

namespace TrackingLife.Services.Installation
{
    public class SeedService : ISeedSerivce
    {
        public SeedService()
        { }

        public void InstallData(IServiceProvider services)
        {
            CreateUserRoles(services).Wait();
        }

        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var roles = new[] { "System Admin", "User" };

            foreach (var role in roles)
            {
                var roleCheck = await roleManager.RoleExistsAsync(role);
                if (!roleCheck)
                    await roleManager.CreateAsync(new ApplicationRole(role));
            }
        }
    }
}