using TrackingLife.Data.Abstract.Entity;
using TrackingLife.Data.Domain.AccountBalances;
using TrackingLife.Data.Domain.Identity;

namespace TrackingLife.Data.Domain.Profiles
{
    /// <summary>
    /// 
    /// </summary>
    public class Profile : Entity, IEntity<int>
    {
        /// <summary>
        /// 
        /// </summary>
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int? AccountBalanceId { get; set; }
        public virtual AccountBalance AccountBalance { get; set; }
    }
}