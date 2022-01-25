using System;

namespace TrackingLife.Web.Api.ViewModels
{
    public class TransactionViewModel
    {
        public int Id { get; set; }
        public Guid UniqueTransaction { get; set; }
        public float CurrentBalance { get; set; }
        public DateTime LastTransactionDateTime { get; set; } = DateTime.UtcNow;
    }
}
