using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TrackingLife.Web.Api.Controllers.AspNetUser
{
    /// <inheritdoc cref="Attribute" />
    /// <summary>
    /// Custom validation filter attribute
    /// </summary>
    public class ValidationFilterAttribute : Attribute, IActionFilter
    {
        /// <inheritdoc />
        /// <summary>
        /// Execute any code before the action executes
        /// </summary>
        /// <param name="context"></param>
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
                context.Result = new BadRequestObjectResult(context.ModelState);
        }

        /// <inheritdoc />
        /// <summary>
        /// Execute any code after the action executes
        /// </summary>
        /// <param name="context"></param>
        public void OnActionExecuted(ActionExecutedContext context)
        { }
    }
}