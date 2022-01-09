using System.ComponentModel.DataAnnotations;
using TrackingLife.Web.Api.ViewModels.Abstract;

namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    /// <summary>
    /// Forgot password view model
    /// </summary>
    public class ForgotPasswordViewModel : Callback
    {
        /// <summary>
        /// Email user
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}