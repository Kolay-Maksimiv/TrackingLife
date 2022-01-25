using System;
using TrackingLife.Data.Enums;

namespace TrackingLife.Web.Api.ViewModels
{
    public class TransactionViewModel
    {
        public int Id { get; set; }
        public float CurrentBalance { get; set; }
        public  int BalanceId { get; set; }
        public TransactionType? Status { get; set; }
    }
}
