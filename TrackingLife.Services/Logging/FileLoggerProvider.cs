using Microsoft.Extensions.Logging;

namespace TrackingLife.Services.Logging
{
    public class FileLoggerProvider : ILoggerProvider
    {
        private string _path;
        public FileLoggerProvider(string path)
        {
            _path = path;
        }
        public ILogger CreateLogger(string categoryName)
        {
            var logger = new FileLogger(_path);
            return logger;
        }

        public void Dispose()
        {
        }
    }
}