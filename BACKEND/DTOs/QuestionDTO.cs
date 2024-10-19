using senai_game.Models;
using System.ComponentModel.DataAnnotations;

namespace senai_game.DTOs
{
    public class QuestionDTO
    {
        
        public int id { get; set; }
        [Required]
        public string descricao { get; set; }
        [Required]
        public int id_processo { get; set; }
        [Required]
        public List<Alternativas> alternativas_list { get; set; }
    }
}
