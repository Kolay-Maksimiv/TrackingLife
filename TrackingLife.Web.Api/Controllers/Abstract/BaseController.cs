using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Data.Infrastructure;
using TrackingLife.Data.Interfaces;
using TrackingLife.Services.Identity.Auth;
using TrackingLife.Web.Api.Utilities;

namespace TrackingLife.Web.Api.Controllers.Abstract
{
    /// <summary>
    /// Base controller
    /// </summary>
    [CurrentUserExist]
    public abstract class BaseController : Controller
    {
        /// <summary>
        /// Application user
        /// </summary>
        public ApplicationUser CurrentUser;

        /// <summary>
        /// SPA Client
        /// </summary>
        public Client Client;

        /// <summary>
        /// Work context
        /// </summary>
        protected readonly IWorkContext WorkContext;

        /// <summary>
        /// API error messages.
        /// </summary>
        protected Error Error;

        /// <summary>
        /// Base controller constructor
        /// </summary>
        /// <param name="workContext"></param>
        protected BaseController(IWorkContext workContext)
        {
            WorkContext = workContext;
            CurrentUser = WorkContext.CurrentUser;

            var clientName = IdentityServerConfig.GetClients()
                .FirstOrDefault(c => c.ClientId == WorkContext.ClientId)?.ClientName;
            Client = new Client
            {
                Id = WorkContext.ClientId,
                Name = clientName,
                ClientUrl = WorkContext.RequestUrl
            };
        }

        /// <summary>
        /// Bad model state
        /// </summary>
        /// <param name="modelState"></param>
        /// <returns></returns>
        protected BadRequestObjectResult Bad(ModelStateDictionary modelState)
        {
            return BadRequest(modelState);
        }

        /// <summary>
        /// Bad raquest object
        /// </summary>
        /// <param name="name"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        protected BadRequestObjectResult Bad(string name, string error)
        {
            ModelState.AddModelError(name, error);
            return BadRequest(ModelState);
        }

        /// <summary>
        /// Bad identity result
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        protected BadRequestObjectResult Bad(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return BadRequest(ModelState);
        }

        /// <summary>
        /// Bad request error
        /// </summary>
        /// <param name="error"></param>
        /// <returns></returns>
        protected BadRequestObjectResult Bad(string error)
        {
            return Bad("BadRequest", error);
        }

        /// <summary>
        /// User name
        /// </summary>
        protected string UserName => CurrentUser?.UserName ?? string.Empty;
    }

    /// <summary>
    /// API error messages.
    /// </summary>
    public class Error
    {
        /// <summary>
        /// User is not workspace user.
        /// </summary>
        public const string UserAlreadyExist = "User already exist";
        /// <summary>
        /// Invalid user name or password
        /// </summary>
        public const string InvalidUserNameOrPassword = "Invalid username or password.";
        /// <summary>
        /// Something went wrong
        /// </summary>
        public const string SomethingWentWrong = "Something went wrong. Please contact administrator";


        /// <summary>
        /// User is not workspace user.
        /// </summary>
        public const string CodeDoesNotExist = "Code does`not exist or incorrect. Please contact administrator";
    }
}