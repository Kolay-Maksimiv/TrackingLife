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
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class AccountBalancesController : BaseController
    {

        private readonly IAccountBalancesService _accountBalancesService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IProfileService _profileService;
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
            UserManager<ApplicationUser> userManager) : base(workContext)
        {
            _profileService = profileService;
            _userManager = userManager;
            _mapper = mapper;
            _accountBalancesService = accountBalancesService;
        }

        /// <summary>
        /// The get API item based on provided JSON object.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The response is 200 (Status - Ok).</returns>
        //[Authorize(Roles = "System Admin")]
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAccountBalanceByIdAsync(int id)
        {
            var result = await _accountBalancesService.GetAccountBalanceByIdAsync(id);

            return Ok(result);
        }

        /// <summary>
        /// The get API items based on provided JSON object.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>The response is 200 (Status - Ok).</returns>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAccountBalances(AccountBalancesFilter filter)
        {
            var isAdmin = await _userManager.IsInRoleAsync(CurrentUser, Consts.SystemAdmin);

            var result = _accountBalancesService.GetAllAccountBalancesAsync(filter, out int itemsCount);

            return Ok(new ListItemsModel<AccountBalanceDto>(result, itemsCount));
        }


        /// <summary>
        /// The add API items based on provided JSON object.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The response is 200 (Status - Ok).</returns>
        //[Authorize(Roles = "System Admin")]
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> AddAccountBalanceAsync([FromBody] AccountBalanceViewModel model)
        {
            var wellnessCategory = new AccountBalance()
            {
                UniqueAccount = model.UniqueAccount,
                CurrentBalance = model.CurrentBalance,
                LastTransactionDateTime = model.LastTransactionDateTime

            };

            var wellnessCategoryId = _accountBalancesService.AddAccountBalance(wellnessCategory);

            var result = await _accountBalancesService.GetAccountBalanceAsync(wellnessCategoryId);

            return Ok(result);
        }

        /// <summary>
        /// The update API item based on provided JSON object.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The response is 200 (Status - Ok).</returns>
        [HttpPut]
        public async Task<IActionResult> EditAccountBalance([FromBody] AccountBalanceViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                var accountBalance = await _accountBalancesService.GetAccountBalanceByIdAsync(model.Id);
                if (accountBalance == null)
                    return NotFound();

                accountBalance.CurrentBalance = model.CurrentBalance;
                accountBalance.LastTransactionDateTime = model.LastTransactionDateTime;

                _accountBalancesService.UpdateAccountBalance(accountBalance);

                var result = _mapper.Map<AccountBalanceDto>(accountBalance);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// The delete API item based on provided JSON object.
        /// </summary>
        /// <returns>The response is 200 (Status - Ok).</returns>
        //[Authorize(Roles = "System Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                var accountBalance = await _accountBalancesService.FindAsync(id);

                if (accountBalance == null)
                    return BadRequest();

                _accountBalancesService.Delete(accountBalance);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
