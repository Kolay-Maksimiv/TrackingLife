using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrackingLife.Data.Abstract.Repository;
using TrackingLife.Data.Domain.Transactions;
using TrackingLife.Data.Dto.TransactionsDto;
using TrackingLife.Data.SearchFilters;
using TrackingLife.Services.Abstract;

namespace TrackingLife.Services.Services.Transactions
{
    public class TransactionService : GeneralService<Transaction>, ITransactionService
    {
        public TransactionService(IRepository<Transaction> repository) : base(repository)
        {

        }

        public async Task<TransactionDto> GetTransactionAsync(int id)
        {
            var transactionDto = new TransactionDto();
            var transaction = await Repository.Table
                .Include(t => t.AccountBalance)
                .FirstOrDefaultAsync(a => a.Id.Equals(id));

            transactionDto.Id = id;
            transactionDto.UniqueTransaction = transaction.UniqueTransaction;
            transactionDto.Status = transaction.Status;
            transactionDto.CurrentBalance = transaction.CurrentBalance;
            transactionDto.LastTransactionDateTime = transaction.LastTransactionDateTime;
            transactionDto.AccountBalanceId = transaction.AccountBalance?.Id;

            return transactionDto;
        }

        public List<TransactionDto> GetAllTransactionsAsync(TransactionFilter filter, out int itemsCount)
        {
            var skip = filter.PageNumber == 1 ? 0 : (filter.PageNumber * filter.Take) - filter.Take;
            itemsCount = 9;

            var transaction = Repository.Table
                .Include(t => t.AccountBalance)
                .Where(w => w.AccountBalanceId
                .Equals(filter.BalanceId));

            itemsCount = transaction.Count();

            var take = transaction.Count() < filter.Take ? transaction.Count() : filter.Take;

            if (transaction.Count() > 0)
            {
                return transaction
                    .Select(s => new TransactionDto
                    {
                        Id = s.Id,
                        UniqueTransaction = s.UniqueTransaction,
                        CurrentBalance = s.CurrentBalance,
                        LastTransactionDateTime = s.LastTransactionDateTime,
                        Status = s.Status,
                        AccountBalanceId = s.AccountBalanceId
                    }).Skip(skip).Take(take).ToList();
            }

            return new List<TransactionDto>();
        }

        public void UpdateTransaction(Transaction transaction)
        {
            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));

            Repository.Update(transaction);
        }

        public void Add(Transaction transaction)
        {
            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));

            Repository.Insert(transaction);
        }

        public int AddTransaction(Transaction transaction)
        {
            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));

            Repository.Insert(transaction);

            return transaction.Id;
        }

        public async Task<TransactionDto> GetEditTransactionAsync(int id, string applicationUserId)
        {
            var transactionDto = new TransactionDto();
            var transaction = await Repository.Table
                .Include(t => t.AccountBalance)
                .FirstOrDefaultAsync(a => a.Id.Equals(id));

            if (transaction == null)
                return new TransactionDto();

            transactionDto.Id = id;
            transactionDto.UniqueTransaction = transaction.UniqueTransaction;
            transactionDto.Status = transaction.Status;
            transactionDto.CurrentBalance = transaction.CurrentBalance;
            transactionDto.LastTransactionDateTime = transaction.LastTransactionDateTime;
            transactionDto.AccountBalanceId = transaction.AccountBalanceId;

            return transactionDto;
        }

        public async Task<Transaction> GetTransactionByIdAsync(int id)
        {
            var transaction = await Repository.Table
                .Include(t => t.AccountBalance)
                .FirstOrDefaultAsync(a => a.Id.Equals(id));

            return transaction;
        }
    }
}
