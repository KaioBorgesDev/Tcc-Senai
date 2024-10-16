using MySql.Data.MySqlClient;
using Mysqlx.Crud;
using Mysqlx.Expr;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace senai_game.Models
{
    public class Score
    {
        private string email_User;
        private int acertos;
        private int erros;

        [JsonConstructor]
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
        //adicionar mais segurancas
        public static string insertScoreAcByEmail(string email)
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
                int scoreUser = 0;

                MySqlCommand command = new MySqlCommand("Select acertos from scores where email_user = @email", conexao);
                command.Parameters.AddWithValue("@email", email);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    scoreUser = (int)reader["acertos"];
                    scoreUser++;
                    conexao.Close();
                }
                else
                {
                    return "Usuario não encontrado.";
                }

                MySqlConnection conexao_update = FactoryConnection.getConnection(conexao_atual);
                conexao_update.Open();
                MySqlCommand command_update = new MySqlCommand("update scores set acertos = @acerto where email_user = @email", conexao_update);
              
                command_update.Parameters.AddWithValue("@acerto", scoreUser);
                command_update.Parameters.AddWithValue("@email", email);
                command_update.ExecuteNonQuery();

                conexao_update.Close();
                return "Inserido com sucesso";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static string insertScoreErByEmail(string email)
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
                int scoreUser = 0;

                MySqlCommand command = new MySqlCommand("Select erros from scores where email_user = @email", conexao);
                command.Parameters.AddWithValue("@email", email);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    scoreUser = (int)reader["erros"];
                    scoreUser++;
                    conexao.Close();
                }
                else
                {
                    return "Usuario não encontrado.";
                }

                MySqlConnection conexao_update = FactoryConnection.getConnection(conexao_atual);
                conexao_update.Open();
                MySqlCommand command_update = new MySqlCommand("update scores set erros = @erro where email_user = @email", conexao_update);

                command_update.Parameters.AddWithValue("@erro", scoreUser);
                command_update.Parameters.AddWithValue("@email", email);
                command_update.ExecuteNonQuery();

                conexao_update.Close();
                return "Inserido com sucesso";
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

