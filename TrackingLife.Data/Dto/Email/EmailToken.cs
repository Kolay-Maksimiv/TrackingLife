
namespace TrackingLife.Data.Dto.Email
{
    /// <summary>
    /// Registration view model
    /// </summary>
    public class EmailToken
    {
        public string Token { get; set; }
        public string BaseUrl { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string IconUrl { get; set; }
    }
}