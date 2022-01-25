using System.Collections.Generic;
using System.Threading.Tasks;
using TrackingLife.Data.Domain.Transactions;
using TrackingLife.Data.Dto.TransactionsDto;
using TrackingLife.Data.SearchFilters;
using TrackingLife.Services.Abstract;

namespace TrackingLife.Services.Services.Transactions
{
    public interface ITransactionService : IGeneralService<Transaction>
    {
        Task<TransactionDto> GetTransactionAsync(int id);
        List<TransactionDto> GetAllTransactionsAsync(TransactionFilter filter, out int itemsCount);
        void UpdateTransaction(Transaction transaction);
        void Add(Transaction transaction);
        int AddTransaction(Transaction transaction);
        Task<TransactionDto> GetEditTransactionAsync(int id, string applicationUserId);
        Task<Transaction> GetTransactionByIdAsync(int id);
    }
}
