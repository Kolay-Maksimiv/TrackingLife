using Microsoft.Extensions.Logging;
using System;
using System.IO;
using TrackingLife.Services.Utilities;

namespace TrackingLife.Services.Logging
{
    public class FileLogger : ILogger
    {
        private string _logFolderPath;
        private static object _lock = new object();
        public FileLogger(string path)
        {
            _logFolderPath = path;
        }
        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return logLevel >= LogLevel.Warning;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            // TODO: Improve file logger exception formatter. Exception stack trace should be logged as well.

            if (formatter != null)
            {
                lock (_lock)
                {
                    Directory.CreateDirectory(_logFolderPath);
                    var fileName = DateTime.Now.ToSafeFileName() + ".log";
                    var filePath = Path.Combine(_logFolderPath, fileName);
                    var msg = $"{DateTime.Now} {eventId} {logLevel} {formatter(state, exception)}";
                    File.AppendAllText(filePath, msg + Environment.NewLine);
                }
            }
        }
    }
}