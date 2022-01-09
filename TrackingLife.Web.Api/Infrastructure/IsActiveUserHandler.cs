using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using TrackingLife.Services.Identity.Auth;

namespace TrackingLife.Web.Api.Infrastructure
{
    public class IsActiveUserHandler : AuthorizationHandler<AllowAccesForUser>
    {
        public readonly IAuthService authService;

        public IsActiveUserHandler(IAuthService authService)
        {
            this.authService = authService;
        }

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            AllowAccesForUser requirement)
        {
            var user = authService.GetByUserName(context.User.Identity.Name);

            if ((user != null && user.IsActive) || user == null)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
