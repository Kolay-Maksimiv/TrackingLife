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
using TrackingLife.Services.Services.AccountBalances;
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
        private readonly IAccountBalancesService _accountBalancesService;
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
            IAccountBalancesService accountBalancesService,
            UserManager<ApplicationUser> userManager) : base(workContext)
        {
            _profileService = profileService;
            _userManager = userManager;
            _mapper = mapper;
            _transactionService = transactionService;
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
        public async Task<IActionResult> GetTransactions(TransactionFilter filter)
        {
            var result = _transactionService.GetAllTransactionsAsync(filter, out int itemsCount);

            return Ok(new ListItemsModel<TransactionDto>(result, itemsCount));
        }


        /// <summary>
        /// The add API items based on provided JSON object.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The response is 200 (Status - Ok).</returns>
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> AddTransactionAsync([FromBody] TransactionViewModel model)
        {
            var transaction = new Transaction()
            {
                UniqueTransaction = Guid.NewGuid(),
                CurrentBalance = model.CurrentBalance,
                LastTransactionDateTime = DateTime.UtcNow,
                AccountBalanceId = model.BalanceId,
                Status = model.Status
            };

            var currentBalance = await _accountBalancesService.GetAccountBalanceAsync(model.BalanceId);
            currentBalance.CurrentBalance = currentBalance.CurrentBalance + model.CurrentBalance;
            currentBalance.LastTransactionDateTime = transaction.LastTransactionDateTime;

             _accountBalancesService.UpdateAccountBalance(currentBalance);

            var transactionId = _transactionService.AddTransaction(transaction);

            var result = await _transactionService.GetTransactionAsync(transactionId);

            return Ok(result);
        }
    }
}
