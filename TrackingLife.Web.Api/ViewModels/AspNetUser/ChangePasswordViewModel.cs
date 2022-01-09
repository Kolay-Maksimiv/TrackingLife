using System.ComponentModel.DataAnnotations;

namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    /// <summary>
    /// Change Password view model
    /// </summary>
    public class ChangePasswordViewModel
    {
        /// <summary>
        /// New password for user
        /// </summary>
        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        /// <summary>
        /// New password for user
        /// </summary>
        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }
    }
}