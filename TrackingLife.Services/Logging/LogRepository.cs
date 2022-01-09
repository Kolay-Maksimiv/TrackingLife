using System.Data;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace TrackingLife.Services.Logging
{
    public class LogRepository
    {
        private readonly string _connectionString;

        public LogRepository(string connectionStr)
        {
            _connectionString = connectionStr;
        }

        private void ExecuteNonQuery(string commandStr, List<SqlParameter> paramList)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                if (connection.State != ConnectionState.Open)
                    connection.Open();

                using (var command = new SqlCommand(commandStr, connection))
                {
                    command.Parameters.AddRange(paramList.ToArray());
                    command.ExecuteNonQuery();
                }
            }
        }

        public void InsertLog(SystemLog log)
        {
            string command = $@"INSERT INTO [dbo].[SystemLog] ([EventID],[LogLevel],[Message],[CreatedTime],[ErrorDetails]) VALUES (@EventID, @LogLevel, @Message, @CreatedTime, @ErrorDetails)";

            var paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter("EventID", log.EventId));
            paramList.Add(new SqlParameter("LogLevel", log.LogLevel));
            paramList.Add(new SqlParameter("Message", log.Message));
            paramList.Add(new SqlParameter("CreatedTime", log.CreatedTime));
            paramList.Add(new SqlParameter("ErrorDetails", log.ErrorDetails));

            ExecuteNonQuery(command, paramList);
        }
    }
}