namespace TrackingLife.Data.Dto
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public int ProfileId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsRemoved { get; set; }
        public bool IsActive { get; set; }
    }
}
