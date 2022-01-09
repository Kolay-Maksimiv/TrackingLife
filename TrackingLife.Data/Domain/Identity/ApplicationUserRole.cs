using Microsoft.AspNetCore.Identity;

namespace TrackingLife.Data.Domain.Identity
{
    public class ApplicationUserRole : IdentityUserRole<string>
    {
        public ApplicationUserRole() : base()
        {

        }
        public virtual ApplicationUser User { get; set; }
        public virtual ApplicationRole Role { get; set; }
    }
}
