using IdentityServer4.Extensions;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Services.Identity.User;
using TrackingLife.Services.Services.Profiles;
using TrackingLife.Services.StaticData;

namespace TrackingLife.Services.Infrastructure
{
    /// <summary>
    ///     Profile Service
    /// </summary>
    public class ProfileService : IdentityServer4.Services.IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;
        private readonly IUserService _userService;
        private readonly IProfileService _profileService;

        /// <summary>
        ///     Profile Service constructor
        /// </summary>
        public ProfileService(IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory,
            IUserService userService,
            IProfileService profileService)
        {
            _userService = userService;
            _claimsFactory = claimsFactory;
            _profileService = profileService;
        }

        /// <summary>
        ///    Get Profile Data Async
        /// </summary>
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userService.GetByIdAsync(sub);
            var principal = await _claimsFactory.CreateAsync(user);

            var claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            var profileId = _profileService.GetProfileIdByUserId(user.Id);
            if (profileId != 0)
            {
                claims.Add(new Claim(JwtClaims.ProfileId, profileId.ToString()));
            }

            if (user.FirstName != null)
                claims.Add(new Claim(JwtClaims.FirstName, user.FirstName));

            if (user.LastName != null)
                claims.Add(new Claim(JwtClaims.LastName, user.LastName));

            claims.Add(new Claim(JwtClaims.IsRemoved, user.IsRemoved.ToString()));

            claims.Add(new Claim(JwtClaims.IsActive, user.IsActive.ToString()));

            context.IssuedClaims = claims;
        }

        /// <summary>
        ///     Is Active Async
        /// </summary>
        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userService.GetByIdAsync(sub);

            context.IsActive = user != null && user.IsActive;
        }
    }
}