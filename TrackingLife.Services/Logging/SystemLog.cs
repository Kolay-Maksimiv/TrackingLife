using System;

namespace TrackingLife.Services.Logging
{
    public class SystemLog
    {
        public int Id { get; set; }
        public int? EventId { get; set; }
        public string LogLevel { get; set; }
        public string Message { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string ErrorDetails { get; set; }
    }
}