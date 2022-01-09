using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;

namespace TrackingLife.Services.Identity.Registration
{
    public interface IRegistrationService
    {
        Task<bool> RegisterAsync(ApplicationUser user, string password, string baseUrl);
    }
}