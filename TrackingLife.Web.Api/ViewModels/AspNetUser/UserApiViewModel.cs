
using System.Collections.Generic;

namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    /// <summary>
    /// User Api view model
    /// </summary>
    public class UserApiViewModel
    {

        /// <summary>
        /// 
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// First name new user
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last name new user
        /// </summary>
        public string LastName { get; set; }

        public string FullName => FirstName + " " + LastName;

        /// <summary>
        /// Phone number new user
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// User role
        /// </summary>
        public List<string> Roles { get; set; }

        /// <summary>
        /// CompanyId
        /// </summary>
        public int? CompanyId { get; set; }

        /// <summary>
        /// Company name
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// OrganisationId
        /// </summary>
        public int? OrganisationId { get; set; }

        /// <summary>
        /// Organisation name
        /// </summary>
        public string OrganisationName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Token { get; set; }


    }
}