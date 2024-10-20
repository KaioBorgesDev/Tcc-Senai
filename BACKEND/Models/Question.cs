
namespace senai_game.Models
{
    public class Question
    {
        private int id;
        private string descricao;
        private int id_processo;
        private List<Alternativas> alternativas_list;

        public Question(int id, string descricao, int id_processo, List<Alternativas> alternativas_list)
        {
            this.id = id;
            this.descricao = descricao;
            this.id_processo = id_processo;
            this.alternativas_list = alternativas_list;
        }

        public int Id_processo { get => id_processo; set => id_processo = value; }
        public string Descricao { get => descricao; set => descricao = value; }
        public int Id { get => id; set => id = value; }
        public List<Alternativas> Alternativas_list { get => alternativas_list; set => alternativas_list = value; }

       
    }
}
