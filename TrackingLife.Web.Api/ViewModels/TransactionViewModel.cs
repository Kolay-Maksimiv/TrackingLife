﻿using System;

namespace TrackingLife.Web.Api.ViewModels
{
    public class TransactionViewModel
    {
        public int Id { get; set; }
        public float CurrentBalance { get; set; }
        public  int BalanceId { get; set; }
        public bool Status { get; set; }
    }
}
