using System;
using Microsoft.Extensions.Logging;

namespace TrackingLife.Services.Logging
{
    public static class Extensions
    {
        public static ILoggerFactory AddDatabase(this ILoggerFactory factory, string connectionStr, Func<string, LogLevel, bool> filter = null)
        {
            var provider = new DbLoggerProvider(connectionStr, filter);

            factory.AddProvider(provider);
            return factory;
        }

        public static ILoggerFactory AddDatabase(this ILoggerFactory factory, LogLevel minLevel, string connectionStr)
        {
            return AddDatabase(factory, connectionStr, (_, logLevel) => logLevel >= minLevel);
        }
    }
}