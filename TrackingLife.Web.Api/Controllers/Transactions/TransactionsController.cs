using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.Identity;
using TrackingLife.Data.Domain.Transactions;
using TrackingLife.Data.Dto.TransactionsDto;
using TrackingLife.Data.Interfaces;
using TrackingLife.Data.SearchFilters;
using TrackingLife.Services.Services.Profiles;
using TrackingLife.Services.Services.Transactions;
using TrackingLife.Services.StaticData;
using TrackingLife.Web.Api.Controllers.Abstract;
using TrackingLife.Web.Api.ViewModels;
using TrackingLife.Web.Api.ViewModels.Abstract;

namespace TrackingLife.Web.Api.Controllers.Transactions
{
    /// <summary>
    /// Transactions API Controller
    /// </summary>
    //[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Roles = "System Admin")]
    [Route("api/[controller]")]
    public class TransactionsController : BaseController
    {
        private readonly ITransactionService _transactionService;
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
        public TransactionsController(IWorkContext workContext,
            IProfileService profileService,
            ITransactionService transactionService,
            IMapper mapper,
            UserManager<ApplicationUser> userManager) : base(workContext)
        {
            _profileService = profileService;
            _userManager = userManager;
            _mapper = mapper;
            _transactionService = transactionService;
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
        public async Task<IActionResult> GetTransactionByIdAsync(int id)
        {
            var result = await _transactionService.GetTransactionByIdAsync(id);

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
        public async Task<IActionResult> GetTransactions(TransactionFilter filter)
        {
            var isAdmin = await _userManager.IsInRoleAsync(CurrentUser, Consts.SystemAdmin);

            var result = _transactionService.GetAllTransactionsAsync(filter, out int itemsCount);

            return Ok(new ListItemsModel<TransactionDto>(result, itemsCount));
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
        public async Task<IActionResult> AddTransactionAsync([FromBody] TransactionViewModel model, int balanceId)
        {
            var wellnessCategory = new Transaction()
            {
                UniqueTransaction = model.UniqueTransaction,
                CurrentBalance = model.CurrentBalance,
                LastTransactionDateTime = model.LastTransactionDateTime,
                AccountBalanceId = balanceId

            };

            var wellnessCategoryId = _transactionService.AddTransaction(wellnessCategory);

            var result = await _transactionService.GetTransactionAsync(wellnessCategoryId);

            return Ok(result);
        }

        /// <summary>
        /// The update API item based on provided JSON object.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The response is 200 (Status - Ok).</returns>
        [HttpPut]
        public async Task<IActionResult> EditTransaction([FromBody] TransactionViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                var accountBalance = await _transactionService.GetTransactionByIdAsync(model.Id);
                if (accountBalance == null)
                    return NotFound();

                accountBalance.CurrentBalance = model.CurrentBalance;
                accountBalance.LastTransactionDateTime = model.LastTransactionDateTime;

                _transactionService.UpdateTransaction(accountBalance);

                var result = _mapper.Map<TransactionDto>(accountBalance);

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
                var accountBalance = await _transactionService.FindAsync(id);

                if (accountBalance == null)
                    return BadRequest();

                _transactionService.Delete(accountBalance);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
