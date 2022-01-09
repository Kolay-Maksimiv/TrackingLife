using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;

namespace TrackingLife.Services.Identity.User
{
    public interface IUserService
    {

        List<ApplicationUser> GetAll();
        Task<List<ApplicationUser>> GetAllAsync();
        Task<List<ApplicationUser>> GetAllAsyncBy(int companyId);
        Task<List<ApplicationUser>> GetAllAsyncBy(List<string> userIds);
        Task<IdentityResult> CreateAsync(ApplicationUser user, string password);
        Task DelByIdAsync(string id);
        Task<ApplicationUser> GetByUserNameAsync(string userName);
        ApplicationUser GetByUserName(string userName);
        Task<ApplicationUser> GetByProfileIdAsync(int profileId);
        Task<ApplicationUser> GetByEmailAsync(string email);
        Task<ApplicationUser> GetByIdAsync(string id);
        Task<IList<ApplicationUser>> GetUsersAsync(IEnumerable<string> userIds);
        Task<IList<ApplicationUser>> GetAllUsersWithProfileAsync(List<string> usersIds);
        Task<IdentityResult> ChangePasswordAsync(string userName, string oldPassword, string newPassword);
        Task<string> GetEmailVerificationTokenAsync(string userName);
        Task<string> GetPasswordResetTokenAsync(string userName);
        Task<string> GetAuthenticatorKeyAsync(string userName);
        Task<string> GetAuthenticatorKeyAsync(ApplicationUser user);

        Task<IdentityResult> ResetAuthenticatorKeyAsync(ApplicationUser user);
        Task<int> CountRecoveryCodesAsync(ApplicationUser user);
        string GetAuthenticationProvider();

        Task<IdentityResult> UpdateAsync(string userName, ApplicationUser applicationUser);
        Task<IdentityResult> VerifyEmailAsync(string userName, string token);
        Task<IdentityResult> ResetPasswordAsync(string userName, string token, string newPassword);
    }
}