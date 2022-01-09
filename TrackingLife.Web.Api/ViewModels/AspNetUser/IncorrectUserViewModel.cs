namespace TrackingLife.Web.Api.ViewModels.AspNetUser
{
    /// <summary>
    /// Device view model
    /// </summary>
    public class IncorrectUserViewModel
    {
        public int Row { get; set; }
        public int Cell { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
    }
}