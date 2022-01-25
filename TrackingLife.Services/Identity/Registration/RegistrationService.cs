using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Services.Identity.User;

namespace TrackingLife.Services.Identity.Registration
{
    public class RegistrationService : IRegistrationService
    {
        private readonly IUserService _userService;

        public RegistrationService(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<bool> RegisterAsync(ApplicationUser user, string password)
        {
            user.FirstName = Regex.Replace(user.FirstName, @"\s+", " ").Trim();
            user.LastName = Regex.Replace(user.LastName, @"\s+", " ").Trim();

            var result = await _userService.CreateAsync(user, password);
            return result.Succeeded;
        }
    }
}