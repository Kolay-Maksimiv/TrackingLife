using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Threading.Tasks;
using TrackingLife.Data.Dto.Email;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace TrackingLife.Data.Abstract.Email
{
    public class EmailRepository : IEmailRepository
    {
        #region Fields

        public const string EmailConfigFrom = "From";
        public const string EmailConfigSmtpServer = "SmtpServer";
        public const string EmailConfigPort = "Port";
        public const string EmailConfigUserName = "UserName";
        public const string EmailConfigPassword = "Password";
        private readonly string _emailConfigFrom;
        private readonly string _emailConfigSmtpServer;
        private readonly string _emailConfigPort;
        private readonly string _emailConfigUserName;
        private readonly string _emailConfigPassword;

        #endregion

        #region Ctor

        public EmailRepository(IConfiguration configuration)
        {
            _emailConfigFrom = configuration.GetSection("EmailConfiguration")[EmailConfigFrom];
            _emailConfigSmtpServer = configuration.GetSection("EmailConfiguration")[EmailConfigSmtpServer];
            _emailConfigPort = configuration.GetSection("EmailConfiguration")[EmailConfigPort];
            _emailConfigUserName = configuration.GetSection("EmailConfiguration")[EmailConfigUserName];
            _emailConfigPassword = configuration.GetSection("EmailConfiguration")[EmailConfigPassword];
        }

        #endregion

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);

            Send(emailMessage);
        }

        public async Task SendEmailAsync(Message message)
        {
            var emailMessage = CreateEmailMessage(message);

            await SendAsync(emailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfigUserName, _emailConfigFrom));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };
            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfigSmtpServer, int.Parse(_emailConfigPort), true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfigUserName, _emailConfigPassword);

                    client.Send(mailMessage);
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_emailConfigSmtpServer, int.Parse(_emailConfigPort), false);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(_emailConfigFrom, _emailConfigPassword);

                    await client.SendAsync(mailMessage);
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}