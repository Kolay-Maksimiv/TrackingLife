using Microsoft.Extensions.Logging;
using System.IO;

namespace TrackingLife.Services.Logging
{
    public static class FileLoggerExtensions
    {
        public static ILoggerFactory AddFile(
            this ILoggerFactory factory,
            string logFolderName)
        {
            var currentFolder = Path.Combine(Directory.GetCurrentDirectory());
            var logFolder = Path.Combine(currentFolder, logFolderName);

            var provider = new FileLoggerProvider(logFolder);
            factory.AddProvider(provider);

            return factory;
        }
    }
}