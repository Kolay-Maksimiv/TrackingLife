using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace TrackingLife.Data.Domain.Identity
{
    public class ApplicationRole : IdentityRole
    {
        public ICollection<ApplicationUserRole> UserRoles { get; set; }

        public ApplicationRole()
        {
        }
        public ApplicationRole(string roleName) : base(roleName)
        {
        }
    }
}
