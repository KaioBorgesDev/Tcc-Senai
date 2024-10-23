using MySql.Data.MySqlClient;
using senai_game.Factory;
using senai_game.Models;

namespace senai_game.Repositories
{
    public class FavoriteRepository
    {
        private readonly MySqlConnection _connection;


        public FavoriteRepository()
        {
            _connection = FactoryConnection.getConnection(ConnectionEnvironment.getConnectionName());
        }

        public  List<Favorite> GetAllFavoritosByEmail(string email)
        {
            List<Favorite> favoritos = new List<Favorite>();
            
            try
            {
                _connection.Open();

                MySqlCommand command = new MySqlCommand("Select prova_Fav, titulo_prova from favoritadas where email_user = @email_user", _connection);
                command.Parameters.AddWithValue("@email_user", email);

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    favoritos.Add(new Favorite((int)reader["prova_fav"], (string)reader["titulo_prova"]));
                }
                return favoritos;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao inserir favorito: " + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }
        public  string insertFavoritos(Favorite favorito)
        {  
            try
            {
                _connection.Open();

                // verifica se já existe o registro
                MySqlCommand checkCommand = new MySqlCommand("SELECT COUNT(*) FROM favoritadas WHERE email_user = @email_user AND prova_fav = @prova_fav", _connection);
                checkCommand.Parameters.AddWithValue("@email_user", favorito.Email_user);
                checkCommand.Parameters.AddWithValue("@prova_fav", favorito.Prova_fav);

                int count_registro = Convert.ToInt32(checkCommand.ExecuteScalar());

                if (count_registro > 0)
                {
                    return "Já existe um registro com essa prova favorita.";
                }

                // Se não existir, faz o INSERT
                MySqlCommand insertCommand = new MySqlCommand("INSERT INTO favoritadas (email_user, prova_fav, titulo_prova) VALUES (@email_user, @prova_fav, @titulo_prova)", _connection);
                insertCommand.Parameters.AddWithValue("@email_user", favorito.Email_user);
                insertCommand.Parameters.AddWithValue("@prova_fav", favorito.Prova_fav);
                insertCommand.Parameters.AddWithValue("@titulo_prova", favorito.Titulo_prova);

                insertCommand.ExecuteNonQuery(); // Use ExecuteNonQuery para comandos de insert
                
                return "Inserido com sucesso";
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao inserir favorito: " + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }
        public string removeFavoritos(Favorite favorito)
        {
            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("delete from favoritadas where email_user = @email_user and prova_fav = @prova_fav", _connection);
                command.Parameters.AddWithValue("@email_user", favorito.Email_user);
                command.Parameters.AddWithValue("@prova_fav", favorito.Prova_fav);

                MySqlDataReader reader = command.ExecuteReader();

                return "Removido com sucesso";
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao remover favorito: " + ex.TargetSite);
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}
