using MySql.Data.MySqlClient;
using System.Text.Json.Serialization;

namespace senai_game.Models
{
    public class Favorito
    {
        private string email_user;
        private int prova_fav;
        private string titulo_prova;

        [JsonConstructor]
        public Favorito(string email_user, int prova_fav, string titulo_prova)
        {
            this.email_user = email_user;
            this.prova_fav = prova_fav;
            this.titulo_prova = titulo_prova;
        }




        public string Email_user { get => email_user; set => email_user = value; }
        public int Prova_fav { get => prova_fav; set => prova_fav = value; }
        public string Titulo_prova { get => titulo_prova; set => titulo_prova = value; }

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
                MySqlCommand command = new MySqlCommand("Select prova_Fav, titulo_prova from favoritadas where email_user = @email_user", conexao);
                command.Parameters.AddWithValue("@email_user", email);

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    favoritos.Add(new Favorito(null, (int)reader["prova_fav"], (string)reader["titulo_prova"]));
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
            string conexao_atual = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User) ?? "senai";

            try
            {
                conexao = FactoryConnection.getConnection(conexao_atual);
                conexao.Open();

                // Verifica se já existe o registro
                MySqlCommand checkCommand = new MySqlCommand("SELECT COUNT(*) FROM favoritadas WHERE email_user = @email_user AND prova_fav = @prova_fav", conexao);
                checkCommand.Parameters.AddWithValue("@email_user", favorito.email_user);
                checkCommand.Parameters.AddWithValue("@prova_fav", favorito.prova_fav);

                int existe = Convert.ToInt32(checkCommand.ExecuteScalar());

                if (existe > 0)
                {
                    return "Já existe um registro com essa prova favorita.";
                }

                // Se não existir, faz o INSERT
                MySqlCommand insertCommand = new MySqlCommand("INSERT INTO favoritadas (email_user, prova_fav, titulo_prova) VALUES (@email_user, @prova_fav, @titulo_prova)", conexao);
                insertCommand.Parameters.AddWithValue("@email_user", favorito.email_user);
                insertCommand.Parameters.AddWithValue("@prova_fav", favorito.prova_fav);
                insertCommand.Parameters.AddWithValue("@titulo_prova", favorito.titulo_prova);

                insertCommand.ExecuteNonQuery(); // Use ExecuteNonQuery para comandos de insert
                conexao.Close();
                return "Inserido com sucesso";
            }
            catch (Exception ex)
            {


                throw new Exception("Erro ao inserir favorito: " + ex.Message);
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