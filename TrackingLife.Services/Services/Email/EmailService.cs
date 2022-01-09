using System.Threading.Tasks;
using TrackingLife.Data.Abstract.Email;
using TrackingLife.Data.Dto.Email;

namespace TrackingLife.Services.Services.Email
{
    public class EmailService : IEmailService
    {

        private readonly IEmailRepository _emailRepository;

        public EmailService(IEmailRepository emailRepository)
        {
            _emailRepository = emailRepository;
        }

        public void SendEmail(Message message)
        {
            _emailRepository.SendEmail(message);
        }

        public async Task SendEmailAsync(Message message)
        {
            await _emailRepository.SendEmailAsync(message);
        }
    }
}