using Microsoft.AspNetCore.Mvc.ViewFeatures;
using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Progresso
    {
        private int id;
        private string emailUser;
        private int idProcesso;
        private int ultima_Questao;

        public Progresso(int id, string emailUser, int idProcesso, int ultima_Questao)
        {
            this.id = id;
            this.emailUser = emailUser;
            this.idProcesso = idProcesso;
            this.ultima_Questao = ultima_Questao;
        }

        public int Id { get => id; set => id = value; }
        public string IdUser { get => emailUser; set => emailUser = value; }
        public int IdProcesso { get => idProcesso; set => idProcesso = value; }

    
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
                MySqlCommand command = new MySqlCommand("Select * from processos where id = @id", conexao);
                command.Parameters.AddWithValue("@id", id);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    return new Progresso((int)reader["id"], (string) reader["idUser"], (int) reader["idProcesso"], (int) reader["ultima_Questao"]);
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
