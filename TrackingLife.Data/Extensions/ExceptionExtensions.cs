using System;
using System.Text;

namespace TrackingLife.Data.Extensions
{
    public static class ExceptionExtensions
    {
        public static string Details(this Exception exception, string newLine = null)
        {
            if (newLine == null)
                newLine = Environment.NewLine;

            var stringBuilder = new StringBuilder();

            stringBuilder.Append("Message: ").Append(exception.Message).Append(newLine);
            stringBuilder.Append("Source: ").Append(exception.Source).Append(newLine);

            if (exception.StackTrace != null)
                stringBuilder.Append("Stack Trace: ").Append(exception.StackTrace.Replace("\r\n", newLine)).Append(newLine);

            if (exception.InnerException != null)
                stringBuilder.Append("Inner Exception: ").Append(Details(exception.InnerException, newLine));

            return stringBuilder.ToString();
        }
    }
}