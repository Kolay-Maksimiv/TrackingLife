using AutoMapper;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.AccountBalances;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Data.Dto;
using TrackingLife.Data.Dto.Email;
using TrackingLife.Data.Interfaces;
using TrackingLife.Services.Identity.Auth;
using TrackingLife.Services.Identity.Registration;
using TrackingLife.Services.Identity.User;
using TrackingLife.Services.Services.Email;
using TrackingLife.Services.Services.Profiles;
using TrackingLife.Services.StaticData;
using TrackingLife.Web.Api.Controllers.Abstract;
using TrackingLife.Web.Api.ViewModels.AspNetUser;

namespace TrackingLife.Web.Api.Controllers.AspNetUser
{
    /// <summary>
    /// Accounts API Controller
    /// </summary>
    [Route("api/[controller]")]
    public class AccountsController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRegistrationService _registrationService;
        private readonly IProfileService _profileService;
        private readonly IAuthService _authService;
        private readonly IEmailService _emailService;
        private readonly IUserService _userService;
        private readonly IRazorViewToStringRenderer _razorViewToStringRenderer;
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// Accounts Controller Constructor
        /// </summary>
        /// <param name="workContext"></param>
        /// <param name="mapper"></param>
        /// <param name="authService"></param>
        /// <param name="userManager"></param>
        /// <param name="registrationService"></param>
        /// <param name="profileService"></param>
        /// <param name="emailService"></param>
        /// <param name="userService"></param>
        /// <param name="razorViewToStringRenderer"></param>
        public AccountsController(IWorkContext workContext,
            IAuthService authService,
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IRegistrationService registrationService,
            IProfileService profileService,
            IEmailService emailService,
            IUserService userService,
            IRazorViewToStringRenderer razorViewToStringRenderer)
            : base(workContext)
        {
            _mapper = mapper;
            _authService = authService;
            _userManager = userManager;
            _registrationService = registrationService;
            _profileService = profileService;
            _emailService = emailService;
            _userService = userService;
            _razorViewToStringRenderer = razorViewToStringRenderer;
        }
        /// <summary>
        /// The create API allows to create a Profile item based on provided JSON object.
        /// </summary>
        /// <param name="model">Registration view model</param>
        /// <returns>Returns a 200 response if item added. Can return 400 if model state is
        /// not valid</returns>
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateUserAsync([FromBody] CreateUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                model.Role = Consts.SystemAdmin;
                var userIdentity = _mapper.Map<ApplicationUser>(model);
                var isSuccess = await _registrationService.RegisterAsync(userIdentity, model.Password);

                if (!isSuccess)
                    return BadRequest("Invalid user name or password");

                var profile = new Data.Domain.Profiles.Profile
                {
                    ApplicationUserId = userIdentity.Id,
                    AccountBalance = new AccountBalance { CurrentBalance = 0 },
                    Phone = model.Phone
                };
                _profileService.AddProfile(profile);

                //add role 
                await _userManager.AddToRoleAsync(userIdentity, model.Role);
                await _userManager.SetPhoneNumberAsync(userIdentity, model.Phone);

                return Ok();
            }

            return BadRequest();
        }

        /// <summary>
        /// The create API allows to create a Profile item based on provided JSON object.
        /// </summary>
        /// <param name="model">Registration view model</param>
        /// <returns>Returns a 200 response if item added. Can return 400 if model state is
        /// not valid</returns>
        [HttpPost("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userService.GetByUserNameAsync(model.Email);

                var isSuccess = await _userManager.CheckPasswordAsync(user, model.Password);
                if (!isSuccess)
                    return BadRequest("Invalid email or password");

                var profile = _profileService.GetProfileByUserId(user.Id);

                var roles = _userManager.GetRolesAsync(user).Result.ToList();
                var token = await _authService.GetJwtAsync(model.Email, "trackingLife_spa");
                var userData = new UserApiViewModel
                {
                    UserId = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Roles = roles,
                    Token = token,
                    Phone = user.PhoneNumber
                };

                return Ok(userData);
            }

            return BadRequest();
        }

        /// <summary>
        /// The reset API allows to reset a User password item based on provided JSON object.
        /// </summary>
        /// <param name="model">Registration view model</param>
        /// <returns>Returns a 204 response if item updated. Can return 400 if model state is
        /// not valid</returns>
        [AllowAnonymous]
        [HttpPost("password")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ValidationFilter]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordViewModel model)
        {
            if (model.UserName == null)
                return NoContent();

            var user = await _authService.GetByUserNameAsync(model.UserName);
            if (user == null)
                // Don't reveal that the user does not exist
                return NoContent();

            var resetPasswordResult = await _userService.ResetPasswordAsync(model.UserName, model.Token, model.NewPassword);
            if (!resetPasswordResult.Succeeded)
                return Bad(resetPasswordResult);

            return NoContent();
        }

        /// <summary>
        /// The update API item based on provided JSON object.
        /// </summary>
        /// <returns>The response is 200 (Status - Ok).</returns>
        [HttpPost("edit-user")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> EditUser([FromBody] UserDto userDto)
        {
            try
            {
                if (userDto?.Id == null)
                    return BadRequest();

                var isAdmin = await _userManager.IsInRoleAsync(CurrentUser, Consts.SystemAdmin);

                if (isAdmin)
                {
                    var user = await _authService.GetByUserIdAsync(userDto.UserId);
                    user.IsRemoved = userDto.IsRemoved;
                    user.IsActive = userDto.IsActive;
                    await _userManager.UpdateAsync(user);

                    return Ok();
                }

                return BadRequest("Don't have permission");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// The reset API allows to reset a User password item based on provided JSON object.
        /// </summary>
        /// <param name="model">Registration view model</param>
        /// <returns>Returns a 204 response if item updated. Can return 400 if model state is
        /// not valid</returns>
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
        [HttpPost("change-password")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Bad("Request is not valid.");
            }

            var identityResult = await _userService.ChangePasswordAsync(CurrentUser.UserName, model.Password, model.NewPassword);
            if (!identityResult.Succeeded)
            {
                return Bad(identityResult);
            }

            return Ok(identityResult);
        }

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user == null)
                    return NotFound();

                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                //var callbackUrl = Url.Action("ResetPassword", "Accounts", new { userId = user.Id, code }, HttpContext.Request.Scheme);

                var token = new EmailToken
                {
                    Email = model.Email,
                    Token = code,
                    BaseUrl = model.CallbackUrl
                };

                //send invitation email
                var subject = "Tracking Life – Reset Your Password";

                var content = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/ForgotPassword.cshtml", token);
                var message = new Message(new List<string> { model.Email }, subject, content);

                await _emailService.SendEmailAsync(message);

                return Ok("ForgotPasswordConfirmation");
            }

            return BadRequest(model);
        }

        [HttpPost("forgot-password/code")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPass([FromBody] ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user == null)
                    return BadRequest("Email does not exist");

                var code = GenerateCodeReset();

                var profile = _profileService.GetProfileByUserId(user.Id); //TODO WTF?
                _profileService.UpdateProfile(profile);

                var token = new EmailToken
                {
                    Email = model.Email,
                    Token = code,
                    BaseUrl = model.CallbackUrl
                };

                //send invitation email
                var subject = "Tracking Life – Reset Your Password";

                var content = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/ForgotPasswordCode.cshtml", token);
                var message = new Message(new List<string> { model.Email }, subject, content);

                await _emailService.SendEmailAsync(message);

                return Ok();
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// The reset API allows to reset a User password item based on provided JSON object.
        /// </summary>
        /// <param name="model">Registration view model</param>
        /// <returns>Returns a 204 response if item updated. Can return 400 if model state is
        /// not valid</returns>
        [AllowAnonymous]
        [HttpPost("reset-password/reset")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model.UserName == null)
            {
                return BadRequest("UserName can not be null.");
            }

            var user = await _authService.GetByUserNameAsync(model.UserName);
            if (user == null)
            {
                return BadRequest("User is not found.");
            }

            var resetPasswordResult = await _userService.ResetPasswordAsync(model.UserName, model.Token, model.NewPassword);
            if (!resetPasswordResult.Succeeded)
                return Bad(resetPasswordResult);

            var profile = _profileService.GetProfileByUserId(user.Id);

            var roles = _userManager.GetRolesAsync(user).Result.ToList();
            var token = await _authService.GetJwtAsync(model.UserName, "trackingLife_spa");
            var userData = new UserApiViewModel
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Roles = roles,
                Token = token
            };

            return Ok(userData);
        }

        #region Private
        private string GenerateCodeReset()
        {
            Random generator = new Random();
            var randomCode = generator.Next(0, 999999).ToString("D6");

            return randomCode;
        }

        private string GeneratePass()
        {
            var options = _userManager.Options.Password;

            int length = options.RequiredLength;

            //bool digit = options.RequireDigit;
            //bool lowercase = options.RequireLowercase;
            //bool uppercase = options.RequireUppercase;

            //StringBuilder password = new StringBuilder();
            //Random random = new Random();

            //while (password.Length < length -1)
            //{
            //    char c = (char)random.Next(32, 126);

            //    if (char.IsDigit(c))
            //        digit = true;
            //    else if (char.IsLower(c))
            //        lowercase = true;
            //    else if (char.IsUpper(c))
            //        uppercase = true;

            //    if (digit)
            //        password.Append((char)random.Next(48, 58));
            //    if (lowercase)
            //        password.Append((char)random.Next(97, 123));
            //    if (uppercase)
            //        password.Append((char)random.Next(65, 91));

            //}
            //password.Append("!");


            return RandomPassword(length);
        }

        // Generate a random number between two numbers  
        private int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }

        // Generate a random string with a given size and case.   
        // If second parameter is true, the return string is lowercase  
        private string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }

        // Generate a random password of a given length (optional)  
        private string RandomPassword(int size = 0)
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(1, false));
            builder.Append(RandomString(3, true));
            builder.Append(RandomNumber(10, 99));

            return builder.ToString();
        }

        #endregion
    }
}