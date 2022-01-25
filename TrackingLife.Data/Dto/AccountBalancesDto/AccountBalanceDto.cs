using System;
using System.Collections.Generic;
using TrackingLife.Data.Domain.Transactions;

namespace TrackingLife.Data.Dto.AccountBalancesDto
{
    /// <summary>
    /// Account Balance Dto
    /// </summary>
    public class AccountBalanceDto
    {
        private ICollection<Transaction> _transactions;
        /// <summary>
        /// Account id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Account Number
        /// </summary>
        public Guid UniqueAccount { get; set; }
        /// <summary>
        /// Current Balance
        /// </summary>
        public float CurrentBalance { get; set; }
        /// <summary>
        /// Last Transaction Date Time
        /// </summary>
        public DateTime LastTransactionDateTime { get; set; }
    }
}
