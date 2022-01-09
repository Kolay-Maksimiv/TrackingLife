using System;

namespace TrackingLife.Services.Utilities
{
    public static partial class Extensions
    {
        public static string ToSafeFileName(this DateTime dateTime)
        {
            return $"{dateTime.Day.ToString("00")}{dateTime.Month.ToString("00")}{dateTime.Year}";
        }
    }
}