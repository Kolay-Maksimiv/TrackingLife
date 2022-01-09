using System.ComponentModel.DataAnnotations;

namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    /// <summary>
    /// Reset Password view model
    /// </summary>
    public class ResetPasswordViewModel
    {
        /// <summary>
        /// Name user
        /// </summary>
        [Required]
        [StringLength(64, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 2)]
        public string UserName { get; set; }
        /// <summary>
        /// Token
        /// </summary>
        [Required]
        public string Token { get; set; }
        /// <summary>
        /// New password for user
        /// </summary>
        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }
    }
}