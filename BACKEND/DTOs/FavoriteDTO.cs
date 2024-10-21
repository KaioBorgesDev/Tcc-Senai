using System.ComponentModel.DataAnnotations;

namespace senai_game.DTOs
{
    public class FavoriteDTO
    {
        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string email_user { get; set; }
        [Required]
        [RegularExpression(@"^\d+$", ErrorMessage = "O valor do id da prova, deve ser um numero!")]
        public int prova_fav { get; set; }
        [Required]
        [MaxLength(200)]
        public string titulo_prova { get; set; }
    }
}
