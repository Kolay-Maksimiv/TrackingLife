using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using TrackingLife.Data.Abstract.Entity;
using TrackingLife.Data.Domain.Profiles;

namespace TrackingLife.Data.Domain.Identity
{
    public class ApplicationUser : IdentityUser, IEntity<string>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateCreated { get; set; }
        public virtual Profile Profile { get; set; }
        public ICollection<ApplicationUserRole> UserRoles { get; set; }
        public bool IsRemoved { get; set; }
        public bool IsActive { get; set; }
    }
}
