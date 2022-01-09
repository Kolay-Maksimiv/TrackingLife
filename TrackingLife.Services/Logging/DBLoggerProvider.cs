using System;
using Microsoft.Extensions.Logging;

namespace TrackingLife.Services.Logging
{
    public class DbLoggerProvider : ILoggerProvider
    {
        private string _connectionString;
        private readonly Func<string, LogLevel, bool> _filter;

        public DbLoggerProvider(string connectionStr, Func<string, LogLevel, bool> filter)
        {
            _connectionString = connectionStr;
            _filter = filter;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new DbLogger(categoryName, _connectionString, _filter);
        }

        public void Dispose()
        {
        }
    }
}