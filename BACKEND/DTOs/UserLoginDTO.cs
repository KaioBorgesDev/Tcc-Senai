using System.ComponentModel.DataAnnotations;

namespace senai_game.DTOs
{
    public class UserLoginDTO
    {

        [Required]
        [EmailAddress]
        public string email { get;}

        [Required]
        [MinLength(6)]
        public string password { get; }


    }
}
