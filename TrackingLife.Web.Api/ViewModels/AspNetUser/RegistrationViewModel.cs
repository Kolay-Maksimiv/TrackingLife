using System.ComponentModel.DataAnnotations;
using TrackingLife.Web.Api.ViewModels.Abstract;

namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    /// <summary>
    /// Registration view model
    /// </summary>
    public class RegistrationViewModel : Callback
    {
        /// <summary>
        /// Email new user
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Code of Company
        /// </summary>
        [Required]
        public string Code { get; set; }

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
        [Phone]
        public string Phone { get; set; }
        /// <summary>
        /// Security stamp when we invite user to workspace
        /// </summary>
        public string SecurityStamp { get; set; }

        /// <summary>
        /// Flag check if user is imported via email
        /// </summary>
        public bool IsInvitedFromExcel { get; set; } = false;
    }
}