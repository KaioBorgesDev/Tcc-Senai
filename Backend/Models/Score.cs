using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Score
    {
        private int id_Score;
        private string email_User;
        private int acertos;
        private int erros;
       
        public Score(int id_Score, string email_User, int acertos, int erros)
        {
            this.id_Score = id_Score;
            this.email_User = email_User;
            this.acertos = acertos;
            this.erros = erros;
        }

        public int Id_Score { get => id_Score; set => id_Score = value; }
        public string Email_User { get => email_User; set => email_User = value; }
        public int Acertos { get => acertos; set => acertos = value; }
        public int Erros { get => erros; set => erros = value; }

        //adicionar mais segurancas
        public static List<Score> getAll(string email_User)
        {
            
            List<Score> scores = new List<Score>();
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
                MySqlCommand command = new MySqlCommand("Select * from score", conexao);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    scores.Add(new Score((int)reader["id_Score"], (string) reader["email_User"], (int) reader["acertos"], (int) reader["erros"]));
                }
                return scores;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
