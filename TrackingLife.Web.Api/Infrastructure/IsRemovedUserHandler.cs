using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using TrackingLife.Services.Identity.Auth;

namespace TrackingLife.Web.Api.Infrastructure
{
    public class IsRemovedUserHandler : AuthorizationHandler<AllowAccesForRemovedUser>
    {
        public readonly IAuthService authService;

        public IsRemovedUserHandler(IAuthService authService)
        {
            this.authService = authService;
        }

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            AllowAccesForRemovedUser requirement)
        {
            var user = authService.GetByUserName(context.User.Identity.Name);

            if ((user != null && !user.IsRemoved) || user == null)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
