using System.Threading.Tasks;
using TrackingLife.Data.Dto.Email;

namespace TrackingLife.Data.Abstract.Email
{
    public interface IEmailRepository
    {
        void SendEmail(Message message);

        Task SendEmailAsync(Message message);
    }

}