using System.Collections.Generic;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.AccountBalances;
using TrackingLife.Data.Dto.AccountBalancesDto;
using TrackingLife.Data.SearchFilters;
using TrackingLife.Services.Abstract;

namespace TrackingLife.Services.Services.AccountBalances
{
    public interface IAccountBalancesService : IGeneralService<AccountBalance>
    {
        Task<AccountBalance> GetAccountBalanceAsync(int id);
        void UpdateAccountBalance(AccountBalance accountBalance);
        void Add(AccountBalance accountBalance);
        int AddAccountBalance(AccountBalance accountBalance);
        Task<AccountBalanceDto> GetEditAccountBalanceAsync(int id, string applicationUserId);
        Task<AccountBalance> GetAccountBalanceByIdAsync(int id);
    }
}
