using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;

namespace TrackingLife.Services.Identity.User
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            return result;
        }

        public async Task<ApplicationUser> GetByIdAsync(string id)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IList<ApplicationUser>> GetUsersAsync(IEnumerable<string> userIds)
        {
            return await _userManager.Users
                .Where(x => userIds.Contains(x.Id))
                .Include(x => x.Profile)
                .ToListAsync();
        }

        public async Task<IList<ApplicationUser>> GetAllUsersWithProfileAsync(List<string> usersIds)
        {
            var users = await _userManager
                                .Users
                                .Where(x => usersIds.Contains(x.Id))
                                .Include(x => x.Profile)
                                .ToListAsync();

            return users;
        }

        public async Task<ApplicationUser> GetByEmailAsync(string email)
        {
            return await _userManager.Users
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(m => m.Email == email);
        }

        public async Task<IdentityResult> ChangePasswordAsync(string userName, string oldPassword, string newPassword)
        {
            var user = await GetByUserNameAsync(userName);
            var changePasswordResult = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            return changePasswordResult;
        }

        public List<ApplicationUser> GetAll()
        {
            var userList = _userManager.Users
                .Include(x => x.Profile)
                //.ThenInclude(x => x.ProfilePictures)
                //.Skip(0)
                //.Take(20)
                .ToList();
            return userList;
        }

        public async Task<List<ApplicationUser>> GetAllAsync()
        {
            var userList = await _userManager.Users
                .Include(x => x.Profile)
                //.ThenInclude(x => x.ProfilePictures)
                //.Skip(0)
                //.Take(20)
                .ToListAsync();
            return userList;
        }

        public async Task<List<ApplicationUser>> GetAllAsyncBy(int companyId)
        {
            var userList = await _userManager
                                    .Users
                                    .Include(x => x.Profile)
                                    .OrderBy(x => x.FirstName)
                                    .ThenBy(x => x.LastName)
                                    .ToListAsync();
            return userList;
        }

        public async Task<List<ApplicationUser>> GetAllAsyncBy(List<string> userIds)
        {
            var userList = await _userManager
                                    .Users
                                    .Where(x => userIds.Contains(x.Id))
                                    .Include(x => x.Profile)
                                    .OrderBy(x => x.FirstName)
                                    .ThenBy(x => x.LastName)
                                    .ToListAsync();
            return userList;
        }

        public async Task<string> GetAuthenticatorKeyAsync(string userName)
        {
            var user = await GetByUserNameAsync(userName);
            var token = await _userManager.GetAuthenticatorKeyAsync(user);

            return token;
        }
        public Task<string> GetAuthenticatorKeyAsync(ApplicationUser user)
        {
            return _userManager.GetAuthenticatorKeyAsync(user);
        }
        public async Task<IdentityResult> ResetAuthenticatorKeyAsync(ApplicationUser user)
        {
            return await _userManager.ResetAuthenticatorKeyAsync(user);
        }

        public async Task<ApplicationUser> GetByUserNameAsync(string userName)
        {
            return await _userManager.Users
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(u => u.UserName == userName);
        }

        public ApplicationUser GetByUserName(string userName)
        {
            return _userManager.Users
                .Include(u => u.Profile)
                .FirstOrDefault(u => u.UserName == userName);
        }

        public async Task<ApplicationUser> GetByProfileIdAsync(int profileId)
        {
            return
                await _userManager.Users
                    .Include(u => u.Profile)
                    .FirstOrDefaultAsync(u => u.Profile.Id == profileId);
        }

        public async Task DelByIdAsync(string id)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user != null)
            {
                user.IsRemoved = true;
                user.Email = user.Id;
                user.UserName = user.Id;

                await _userManager.UpdateAsync(user);
            }
        }

        public async Task<string> GetEmailVerificationTokenAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(token);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public async Task<string> GetPasswordResetTokenAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            return token;
        }

        public async Task<IdentityResult> UpdateAsync(string userName, ApplicationUser applicationUser)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            _mapper.Map(applicationUser, user);

            var result = await _userManager.UpdateAsync(user);
            return result;
        }

        public async Task<IdentityResult> VerifyEmailAsync(string userName, string token)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            var base64EncodedBytes = System.Convert.FromBase64String(token);
            token = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);

            var result = await _userManager.ConfirmEmailAsync(user, token);
            return result;
        }

        public Task<int> CountRecoveryCodesAsync(ApplicationUser user)
        {
            return _userManager.CountRecoveryCodesAsync(user);
        }

        public string GetAuthenticationProvider()
        {
            return _userManager.Options.Tokens.AuthenticatorTokenProvider;
        }

        public async Task<IdentityResult> ResetPasswordAsync(string userName, string token, string newPassword)
        {
            var user = await GetByUserNameAsync(userName);
            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
            return result;
        }
    }
}