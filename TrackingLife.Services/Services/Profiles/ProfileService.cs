using System;
using System.Linq;
using System.Threading.Tasks;
using Castle.Core.Internal;
using Microsoft.EntityFrameworkCore;
using TrackingLife.Data.Abstract.Repository;
using TrackingLife.Data.Domain.Profiles;
using TrackingLife.Data.Dto;
using TrackingLife.Services.Abstract;

namespace TrackingLife.Services.Services.Profiles
{
    public class ProfileService : GeneralService<Profile>, IProfileService
    {
        public ProfileService(IRepository<Profile> repo) : base(repo)
        {
        }

        public void UpdateProfile(Profile profile)
        {
            if (profile == null)
                throw new ArgumentNullException(nameof(profile));

            Repository.Update(profile);
        }

        public void AddProfile(Profile profile)
        {
            if (profile == null)
                throw new ArgumentNullException(nameof(profile));

            Repository.Insert(profile);
        }
        public async Task<ProfileDto> GetProfileDtoAsync(int id)
        {
            var profileDto = new ProfileDto();
            var profile = await Repository.Table
                .Include(m => m.ApplicationUser)
                .FirstOrDefaultAsync(u => u.Id.Equals(id));
            profileDto.Id = id;
            profileDto.FirstName = profile.ApplicationUser.FirstName;
            profileDto.LastName = profile.ApplicationUser.LastName;
            profileDto.Email = profile.ApplicationUser.Email;
            return profileDto;
        }

        public async Task<Profile> GetProfileAsync(int id)
        {
            var profile = await Repository.Table.Include(x => x.AccountBalance)
                .Include(u => u.ApplicationUser)
                .FirstOrDefaultAsync(u => u.Id.Equals(id));
            return profile;
        }

        /// <summary>
        /// Gets profile
        /// </summary>
        /// <param name="userId">Profile identifier</param>
        /// <returns>Profile</returns>
        public Profile GetProfileByUserId(string userId)
        {
            if (userId.IsNullOrEmpty())
                throw new ArgumentNullException(nameof(userId));

            var profile = Repository.Table
                .Include(x => x.ApplicationUser)
                .Include(b => b.AccountBalance)
                .ThenInclude(c => c.Transactions)
                .FirstOrDefault(x => x.ApplicationUserId.Equals(userId));
            return profile;
        }

        public int GetProfileIdByUserId(string userId)
        {
            if (userId.IsNullOrEmpty())
                throw new ArgumentNullException(nameof(userId));

            var profileId = Repository.TableNoTracking
                .Where(x => x.ApplicationUserId.Equals(userId))
                .Select(x => x.Id)
                .FirstOrDefault();

            return profileId;
        }

        /// <summary>
        /// Get Info about user profile
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public string GetUserIdByProfileId(int profileId)
        {
            var userId = Repository.Table
                .FirstOrDefault(x => x.Id.Equals(profileId))?.ApplicationUserId;

            return userId;
        }
    }
}
