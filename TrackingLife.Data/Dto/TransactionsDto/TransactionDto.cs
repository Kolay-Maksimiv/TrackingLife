using System;

namespace TrackingLife.Data.Dto.TransactionsDto
{
    /// <summary>
    /// Transaction Dto
    /// </summary>
    public class TransactionDto
    {
        public int Id { get; set; }
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
        public DateTime LastTransactionDateTime { get; set; }
        /// <summary>
        /// Account Balance
        /// </summary>
        public int? AccountBalanceId { get; set; }
    }
}
