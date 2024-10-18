using System.ComponentModel.DataAnnotations;

namespace senai_game.DTOs
{
    public class UserDTO
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        [MinLength(6)]
        public string password { get; set; }

        [Required]
        public string username { get; set; }
    }
}
