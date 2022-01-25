using System;
using System.Collections.Generic;
using TrackingLife.Data.Abstract.Entity;
using TrackingLife.Data.Domain.Transactions;

namespace TrackingLife.Data.Domain.AccountBalances
{
    /// <summary>
    /// Account Balance
    /// </summary>
    public class AccountBalance : Entity, IEntity<int>
    {
        private ICollection<Transaction> _transactions;
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
        public DateTime LastTransactionDateTime { get; set; } = DateTime.UtcNow;
        /// <summary>
        /// List Transaction
        /// </summary>
        public virtual ICollection<Transaction> Transactions
        {
            get => _transactions ?? (_transactions = new List<Transaction>());
            protected set => _transactions = value;
        }
    }
}
