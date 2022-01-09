using System.Threading.Tasks;
using TrackingLife.Data.Dto.Email;

namespace TrackingLife.Services.Services.Email
{
    public interface IEmailService
    {
        void SendEmail(Message message);

        Task SendEmailAsync(Message message);
    }
}