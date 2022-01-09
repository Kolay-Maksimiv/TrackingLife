using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Reflection;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Web.Api.Controllers.Abstract;

namespace TrackingLife.Web.Api.Utilities
{
    /// <summary>
    /// Application user verification filter
    /// </summary>
    public class CurrentUserExistAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// On Action Execution Async
        /// </summary>
        /// <param name="context">Request Context</param>
        /// <param name="next">Request Next Delegate</param>
        /// <returns></returns>
        public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //If this is not authorized controller then continue request
            if (!HasControllerAuthorizeAttribute(context.Controller))
                return base.OnActionExecutionAsync(context, next);

            //If current action method has AllowAnonymousAttribute then continue request
            var method = ((ControllerActionDescriptor)context.ActionDescriptor).MethodInfo;
            if (HasMethodAllowAnonymousAttribute(method))
                return base.OnActionExecutionAsync(context, next);

            //basic initializing of currentUser variable
            ApplicationUser currentUser = null;

            //Check if this is UserBaseController
            if (context.Controller is BaseController userBaseController)
            {
                //set current user
                currentUser = userBaseController.CurrentUser;
            }

            //If current user not not exist then set ConflictResult
            if (currentUser is null)
            {
                context.Result = new ConflictResult();
            }

            return base.OnActionExecutionAsync(context, next);
        }

        /// <summary>
        /// Check if request controller has an Authorize attribute
        /// </summary>
        /// <param name="controller">controller of request</param>
        /// <returns></returns>
        private bool HasControllerAuthorizeAttribute(object controller)
        {
            return controller.GetType().IsDefined(typeof(AuthorizeAttribute), true);
        }

        private bool HasMethodAllowAnonymousAttribute(ICustomAttributeProvider method)
        {
            return method.IsDefined(typeof(AllowAnonymousAttribute), false);
        }
    }
}