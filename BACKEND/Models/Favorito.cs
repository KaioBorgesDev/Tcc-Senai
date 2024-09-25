using MySql.Data.MySqlClient;
using System.Text.Json.Serialization;

namespace senai_game.Models
{
    public class Favorito
    {
        private string email_user;
        private int prova_fav;
        
        [JsonConstructor]
        public Favorito(string email_user, int prova_fav)
        {
            this.email_user = email_user;
            this.prova_fav = prova_fav;
        }

        public string Email_user { get => email_user; set => email_user = value; }
        public int Prova_fav { get => prova_fav; set => prova_fav = value; }

        public static List<Favorito> GetAllFavoritosByEmail(string email)
        {
            List<Favorito> favoritos = new List<Favorito>();

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
                MySqlCommand command = new MySqlCommand("Select * from favoritadas where email_user=@email_user", conexao);
                command.Parameters.AddWithValue("@email_user", email);

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    favoritos.Add(new Favorito((string)reader["email_user"], (int)reader["prova_fav"]));
                }
                return favoritos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static string insertFavoritos(Favorito favorito)
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
                MySqlCommand command = new MySqlCommand("insert into favoritadas (email_user, prova_fav) values (@email_user, @prova_fav)", conexao);
                command.Parameters.AddWithValue("@email_user", favorito.email_user);
                command.Parameters.AddWithValue("@prova_fav", favorito.prova_fav);

                MySqlDataReader reader = command.ExecuteReader();

                return "Inserido com sucesso";
                               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static string removeFavoritos(Favorito favorito)
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
                MySqlCommand command = new MySqlCommand("delete from favoritadas where email_user = @email_user and prova_fav = @prova_fav", conexao);
                command.Parameters.AddWithValue("@email_user", favorito.email_user);
                command.Parameters.AddWithValue("@prova_fav", favorito.prova_fav);

                MySqlDataReader reader = command.ExecuteReader();
                
                return "Removido com sucesso";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}