﻿using System;
using TrackingLife.Data.Abstract.Entity;
using TrackingLife.Data.Domain.AccountBalances;

namespace TrackingLife.Data.Domain.Transactions
{
    /// <summary>
    /// Transaction
    /// </summary>
    public class Transaction : Entity, IEntity<int>
    {
        /// <summary>
        /// Transaction Number
        /// </summary>
        public Guid UniqueTransaction { get; set; }
        /// <summary>
        /// Current Balance
        /// </summary>
        public float CurrentBalance { get; set; }
        /// <summary>
        /// Last Transaction Date Time
        /// </summary>
        public DateTime LastTransactionDateTime { get; set; } = DateTime.UtcNow;
        /// <summary>
        /// 
        /// </summary>
        public bool Status { get; set; }
        /// <summary>
        /// Account Balance
        /// </summary>
        public int? AccountBalanceId { get; set; }
        public virtual AccountBalance AccountBalance { get; set; }
    }
}
