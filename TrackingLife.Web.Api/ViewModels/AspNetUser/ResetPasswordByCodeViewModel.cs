using System.ComponentModel.DataAnnotations;

namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    /// <summary>
    /// ResetPassByCodeViewModel
    /// </summary>
    public class ResetPasswordByCodeViewModel
    {
        /// <summary>
        /// Email new user
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Code 
        /// </summary>
        [Required]
        public string Code { get; set; }
    }
}