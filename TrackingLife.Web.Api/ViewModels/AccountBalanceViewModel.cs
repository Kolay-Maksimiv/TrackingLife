using System;

namespace TrackingLife.Web.Api.ViewModels
{
    public class AccountBalanceViewModel
    {
        public int Id { get; set; }
        public Guid UniqueAccount { get; set; }
        public float CurrentBalance { get; set; }
        public DateTime LastTransactionDateTime { get; set; } = DateTime.UtcNow;
    }
}
