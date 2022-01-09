namespace Queally.Services.Identity.Cache
{
    public static class UserCacheDefaults
    {
        /// <summary>
        /// Key for user detail model
        /// </summary>
        /// <remarks>
        /// {0} : user email
        /// </remarks>
        public static string GeneralPersonCacheKey => "TrackingLife.public.user.userEmail-{0}";

        /// <summary>
        /// Gets a key pattern to clear cache
        /// </summary>
        public static string GeneralPersonPrefixCacheKey => "TrackingLife.public.user";
        /// <summary>
        /// Key for user detail model
        /// </summary>
        /// <remarks>
        /// {0} : user email
        /// </remarks>
        public static string UserCacheKey => "TrackingLife.user.userEmail-{0}";

        /// <summary>
        /// Gets a key pattern to clear cache
        /// </summary>
        public static string UserPrefixCacheKey => "TrackingLife.user";
    }
}