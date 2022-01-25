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

        public async Task<AccountBalanceDto> GetAccountBalanceAsync(int id)
        {
            var accountBalanceDto = new AccountBalanceDto();
            var accountBalance = await Repository.Table.FirstOrDefaultAsync(a => a.Equals(id));

            accountBalanceDto.Id = id;
            accountBalanceDto.UniqueAccount = accountBalance.UniqueAccount;
            accountBalanceDto.CurrentBalance = accountBalance.CurrentBalance;
            accountBalanceDto.LastTransactionDateTime = accountBalance.LastTransactionDateTime;

            return accountBalanceDto;
        }

        public List<AccountBalanceDto> GetAllAccountBalancesAsync(AccountBalancesFilter filter, out int itemsCount)
        {
            var skip = filter.PageNumber == 1 ? 0 : (filter.PageNumber * filter.Take) - filter.Take;
            itemsCount = 9;

            var accountBalance = Repository.Table;

            itemsCount = accountBalance.Count();

            var take = accountBalance.Count() < filter.Take ? accountBalance.Count() : filter.Take;

            if(accountBalance.Count() > 0)
            {
                return accountBalance
                    .Select(s => new AccountBalanceDto
                    {
                        Id = s.Id,
                        UniqueAccount = s.UniqueAccount,
                        CurrentBalance = s.CurrentBalance,
                        LastTransactionDateTime = s.LastTransactionDateTime
                    }).Skip(skip).Take(take).ToList();
            }

            return new List<AccountBalanceDto>();
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
