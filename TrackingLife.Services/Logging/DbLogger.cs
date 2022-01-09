using Microsoft.Extensions.Logging;
using System;
using TrackingLife.Data.Extensions;

namespace TrackingLife.Services.Logging
{
    public class DbLogger : ILogger
    {
        private string _categoryName;
        private LogRepository _helper;
        private Func<string, LogLevel, bool> _filter;

        private int MessageMaxLength = 4000;

        public DbLogger(string categoryName, string connectionString, Func<string, LogLevel, bool> filter)
        {
            _categoryName = categoryName;
            _helper = new LogRepository(connectionString);
            _filter = filter;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
                return;

            if (formatter == null)
                throw new ArgumentNullException(nameof(formatter));

            var message = formatter(state, exception);
            if (string.IsNullOrEmpty(message))
                return;

            if (exception != null)
                message += "\n" + exception.ToString();


            message = message.Length > MessageMaxLength
                ? message.Substring(0, MessageMaxLength)
                : message;

            var eventLog = new SystemLog
            {
                Message = message,
                EventId = eventId.Id,
                LogLevel = logLevel.ToString(),
                CreatedTime = DateTime.UtcNow,
                ErrorDetails = exception?.Details()
            };

            _helper.InsertLog(eventLog);
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return _filter == null || _filter(_categoryName, logLevel);
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }
    }
}