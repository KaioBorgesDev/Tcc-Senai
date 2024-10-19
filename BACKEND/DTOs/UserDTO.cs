using System.ComponentModel.DataAnnotations;

namespace senai_game.DTOs
{
    public class UserDTO
    {
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string email { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(15)]
        public string password { get; set; }

        [Required]
        [MaxLength(45)]
        public string username { get; set; }
    }
}
