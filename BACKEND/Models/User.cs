
namespace senai_game.Models
{
    public class User
    {
        
        private string email;
        private string password;
        private string username;
        private string status;
        private string rules;

        public User(string email, string password, string username)
        {
            this.email = email;
            this.password = password;
            this.username = username;        
        }

        public User(string email, string password, string username, string status, string rules) : this(email, password, username)
        {
            this.status = status;
            this.rules = rules;
        }

        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string Username { get => username; set => username = value; }
        public string Status { get => status; set => status = value; }
        public string Rules { get => rules; set => rules = value; }
    }
}
