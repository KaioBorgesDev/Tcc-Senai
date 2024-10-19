using senai_game.Models;
using System.ComponentModel.DataAnnotations;

namespace senai_game.DTOs
{
    public class ProcessDTO
    {
        
       
        public int id { get; set; }
        [Required]
        public string name { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        [RegularExpression(@"^\d+$", ErrorMessage = "O valor do semestre, deve ser um numero!")]
        [MaxLength(1)]
        [Range(int.MinValue, 2, ErrorMessage = "O valor do semestre só pode ser 1 ou 2!")]
        public string semestre { get; set; }
        public List<Question> perguntas { get; set; }
    }
}
