using System;
using System.ComponentModel.DataAnnotations;

namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    public class CreateUserViewModel
    {
        /// <summary>
        /// Email new user
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        /// <summary>
        /// Password new user
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// Confirm password new user
        /// </summary>
        public string ConfirmPassword { get; set; }
        /// <summary>
        /// First name new user
        /// </summary>
        [Required]
        [StringLength(64, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 2)]
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
        /// Date create new user
        /// </summary>
        public DateTime DateCreated { get; set; } = DateTime.Now;

        public bool IsActive { get; set; }

        public int? CompanyId { get; set; }

        public string Role { get; set; }
        public bool CreatePasswordAutomatically { get; set; }
    }
}
