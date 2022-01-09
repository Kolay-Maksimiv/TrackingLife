using System.ComponentModel.DataAnnotations;

namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    /// <summary>
    /// Login view model
    /// </summary>
    public class LoginViewModel
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
        [Required]
        public string Password { get; set; }
    }
}