using System.ComponentModel.DataAnnotations;

namespace senai_game.DTOs
{
    public class UserDTO
    {
        [Required]
        [EmailAddress]
        private string email;

        [Required]
        [MinLength(6)]
        private string password;

        [Required]
        private string username;


        private string status;
        private string rules;


        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string Username { get => username; set => username = value; }
        public string Status { get => status; set => status = value; }
        public string Rules { get => rules; set => rules = value; }


    }
}
