using AutoMapper;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.AccountBalances;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Data.Dto.AccountBalancesDto;
using TrackingLife.Data.Interfaces;
using TrackingLife.Data.SearchFilters;
using TrackingLife.Services.Identity.User;
using TrackingLife.Services.Services.AccountBalances;
using TrackingLife.Services.Services.Profiles;
using TrackingLife.Services.StaticData;
using TrackingLife.Web.Api.Controllers.Abstract;
using TrackingLife.Web.Api.ViewModels;
using TrackingLife.Web.Api.ViewModels.Abstract;

namespace TrackingLife.Web.Api.Controllers.AccountBalances
{
    /// <summary>
    /// Account Balance API Controller
    /// </summary>
    [Route("api/[controller]")]
    public class AccountBalancesController : BaseController
    {

        private readonly IAccountBalancesService _accountBalancesService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IProfileService _profileService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="workContext"></param>
        /// <param name="profileService"></param>
        /// <param name="accountBalancesService"></param>
        /// <param name="mapper"></param>
        /// <param name="userManager"></param>
        public AccountBalancesController(IWorkContext workContext,
            IProfileService profileService,
            IAccountBalancesService accountBalancesService,
            IMapper mapper,
            IUserService userService,
            UserManager<ApplicationUser> userManager) : base(workContext)
        {
            _profileService = profileService;
            _userManager = userManager;
            _userService = userService;
            _mapper = mapper;
            _accountBalancesService = accountBalancesService;
        }

        /// <summary>
        /// The get API items based on provided JSON object.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>The response is 200 (Status - Ok).</returns>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAccountBalances(int id)
        {
            id = 9;
            var user = await _userService.GetByProfileIdAsync(id);
            var profile = _profileService.GetProfileByUserId(user.Id);

            var result = new AccountBalanceDto
            {
                Id = profile.AccountBalance.Id,
                CurrentBalance = profile.AccountBalance.CurrentBalance,
                LastTransactionDateTime = profile.AccountBalance.LastTransactionDateTime,
                UniqueAccount = profile.AccountBalance.UniqueAccount,
                ProfileId = profile.Id
            };

            return Ok(result);
        }
    }
}
