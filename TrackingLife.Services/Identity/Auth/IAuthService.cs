using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;

namespace TrackingLife.Services.Identity.Auth
{
    public interface IAuthService
    {
        Task<string> GetJwtAsync(string username, string clientId);
        Task<ApplicationUser> GetByUserNameAsync(string username);
        Task<ApplicationUser> GetByUserIdAsync(string userId);
        ApplicationUser GetByUserName(string username);
    }
}