using System.Threading.Tasks;
using TrackingLife.Data.Domain.Profiles;
using TrackingLife.Data.Dto;
using TrackingLife.Services.Abstract;

namespace TrackingLife.Services.Services.Profiles
{
    public interface IProfileService : IGeneralService<Profile>
    {
        void UpdateProfile(Profile profile);
        void AddProfile(Profile profile);
        Task<ProfileDto> GetProfileDtoAsync(int id);
        Task<Profile> GetProfileAsync(int id);
        Profile GetProfileByUserId(string userId);
        int GetProfileIdByUserId(string userId);
        string GetUserIdByProfileId(int profileId);
    }
}
