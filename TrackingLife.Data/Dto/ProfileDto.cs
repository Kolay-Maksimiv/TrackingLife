namespace TrackingLife.Data.Dto
{
    public class ProfileDto
    {
        public int Id { get; set; }
        public string PictureUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => FirstName + " " + LastName;
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
