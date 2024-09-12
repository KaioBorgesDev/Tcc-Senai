using Microsoft.AspNetCore.Mvc.ViewFeatures;
using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Progresso 
    {
        private int id_progresso;
        private string emailUser;
        private int id_prova;
        private int ultima_Questao;
        private DateOnly data_progresso;

        public Progresso(int id, string emailUser, int idProcesso, int ultima_Questao)
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

        public static Progresso getById(int id)
        {
            MySqlConnection conexao;
            string conexao_atual = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);

            if (conexao_atual == null)
            {
                conexao_atual = "senai";
            }

            try
            {
                conexao = FactoryConnection.getConnection(conexao_atual);
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Select * from progresso where id_progresso = @id", conexao);
                command.Parameters.AddWithValue("@id", id);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    return new Progresso((int)reader["id_progresso"], (string) reader["email_user"], (int) reader["id_prova"], (int) reader["ultima_questao"]);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
