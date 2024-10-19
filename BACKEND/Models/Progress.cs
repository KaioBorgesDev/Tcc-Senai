using Microsoft.AspNetCore.Mvc.ViewFeatures;
using MySql.Data.MySqlClient;
using senai_game.Factory;

namespace senai_game.Models
{
    public class Progress
    {
        private int id_progresso;
        private string emailUser;
        private int id_prova;
        private int ultima_Questao;
        private DateOnly data_progresso;

        public Progress(int id, string emailUser, int idProcesso, int ultima_Questao)
        {
            this.id_progresso = id;
            this.emailUser = emailUser;
            this.id_prova = idProcesso;
            this.ultima_Questao = ultima_Questao;
        }

        public int Id_Processo { get => id_progresso; set => id_progresso = value; }
        public string IdUser { get => emailUser; set => emailUser = value; }
        public int IdProcesso { get => id_prova; set => id_prova = value; }
        public int Ultima_Questao { get => ultima_Questao; set => ultima_Questao = value; }
        public DateOnly Data_progresso { get => data_progresso; set => data_progresso = value; }

       
    }
}
