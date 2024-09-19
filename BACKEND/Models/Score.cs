using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Score
    {
        private string email_User;
        private int acertos;
        private int erros;

        public Score(string email_User, int acertos, int erros)
        {
            this.email_User = email_User;
            this.acertos = acertos;
            this.erros = erros;
        }


        public string Email_User { get => email_User; set => email_User = value; }
        public int Acertos { get => acertos; set => acertos = value; }
        public int Erros { get => erros; set => erros = value; }

        //adicionar mais segurancas
        public static List<Score> getAll()
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
                MySqlCommand command = new MySqlCommand("Select * from scores", conexao);
                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    scores.Add(new Score((string)reader["email_User"], (int)reader["acertos"], (int)reader["erros"]));
                }
                return scores;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        internal static Score getScoreByEmail(string email)
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
                MySqlCommand command = new MySqlCommand("Select * from scores where email_User = @email", conexao);
                command.Parameters.AddWithValue("@email", email);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    return new Score((string)reader["email_User"], (int)reader["acertos"], (int)reader["erros"]);
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

