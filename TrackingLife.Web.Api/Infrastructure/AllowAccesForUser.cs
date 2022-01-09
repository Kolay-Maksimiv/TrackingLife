using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrackingLife.Web.Api.Infrastructure
{
    public class AllowAccesForUser : IAuthorizationRequirement
    {
        public AllowAccesForUser(bool isActive)
        {
            IsActive = isActive;
        }

        public bool IsActive { get; }
    }

    public class AllowAccesForRemovedUser : IAuthorizationRequirement
    {
        public AllowAccesForRemovedUser(bool isRemoved)
        {
            IsRemoved = isRemoved;
        }

        public bool IsRemoved { get; }
    }
}
