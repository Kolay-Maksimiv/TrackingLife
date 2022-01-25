using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrackingLife.Data.Abstract.Repository;
using TrackingLife.Data.Domain.AccountBalances;
using TrackingLife.Data.Dto.AccountBalancesDto;
using TrackingLife.Data.SearchFilters;
using TrackingLife.Services.Abstract;

namespace TrackingLife.Services.Services.AccountBalances
{
    public class AccountBalancesService : GeneralService<AccountBalance>, IAccountBalancesService
    {
        public AccountBalancesService(IRepository<AccountBalance> repository) : base(repository)
        {

        }

        public async Task<AccountBalance> GetAccountBalanceAsync(int id)
        {
            var accountBalance = await Repository.Table
                .FirstOrDefaultAsync(a => a.Id == id);

            return accountBalance;
        }


        public void UpdateAccountBalance(AccountBalance accountBalance)
        {
            if (accountBalance == null)
                throw new ArgumentNullException(nameof(accountBalance));

            Repository.Update(accountBalance);
        }

        public void Add(AccountBalance accountBalance)
        {
            if (accountBalance == null)
                throw new ArgumentNullException(nameof(accountBalance));

            Repository.Insert(accountBalance);
        }

        public int AddAccountBalance(AccountBalance accountBalance)
        {
            if (accountBalance == null)
                throw new ArgumentNullException(nameof(accountBalance));

            Repository.Insert(accountBalance);

            return accountBalance.Id;
        }

        public async Task<AccountBalanceDto> GetEditAccountBalanceAsync(int id, string applicationUserId)
        {
            var accountBalanceDto = new AccountBalanceDto();
            var accountBalance = await Repository.Table.FirstOrDefaultAsync(a => a.Equals(id));

            if (accountBalance == null)
                throw new ArgumentNullException(nameof(accountBalance));

            accountBalanceDto.Id = id;
            accountBalanceDto.UniqueAccount = accountBalance.UniqueAccount;
            accountBalanceDto.CurrentBalance = accountBalance.CurrentBalance;
            accountBalanceDto.LastTransactionDateTime = accountBalance.LastTransactionDateTime;

            return accountBalanceDto;
        }

        public async Task<AccountBalance> GetAccountBalanceByIdAsync(int id)
        {
            var accountBalance = await Repository.Table.FirstOrDefaultAsync(a => a.Equals(id));

            return accountBalance;
        }
    }
}
