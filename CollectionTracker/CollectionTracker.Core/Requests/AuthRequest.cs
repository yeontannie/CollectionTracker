namespace CollectionTracker.Core.Requests
{
    public class AuthRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Confirmation { get; set; }
    }
}
