
namespace Directory.Models
{
    public class TokenModel
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public int ExpTime { get; set; }
        public object Roles { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
    }
}
