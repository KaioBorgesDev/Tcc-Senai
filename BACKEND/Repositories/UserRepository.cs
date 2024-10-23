using MySql.Data.MySqlClient;
using senai_game.Factory;
using senai_game.Models;

namespace senai_game.Repositories
{
    public class UserRepository
    {
        //inicinado uma conexão
        private readonly MySqlConnection _connection;

        //construtor
        public UserRepository()
        {
            _connection = FactoryConnection.getConnection(ConnectionEnvironment.getConnectionName());
        }

        public User GetUser(string email, string password)
        {
            try
            {
                _connection.Open();

                MySqlCommand command = new MySqlCommand("Select * from usuarios where email = @email and password = @password", _connection);
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    var user = new User(
                        (string)reader["email"],
                        (string)reader["password"],
                        (string)reader["username"],
                        (string)reader["status"],
                        (string)reader["rule"]
                        );

                    return user;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao pegar usuario " + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }
        public string GetRules(string email)
        {
            try
            {
                _connection.Open();

                MySqlCommand command = new MySqlCommand("Select rule from usuarios where email = @email", _connection);
                command.Parameters.AddWithValue("@email", email);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                { 
                    return (string)reader["rule"];      
                }
                return "Não foi encotrado usuario com este email";
            }
            catch (Exception ex)
            {
                return "Erro ao pegar rules do usuario! Consulte o erro:" + ex.ToString();
            }
            finally
            {
                _connection.Close();
            }
        }
        public string InsertUser(User usuario)
        {
            try
            {
                _connection.Open();

                MySqlCommand command = new MySqlCommand("insert into usuarios (email, password, username, status) values (@email, @password, @username, @status)", _connection);
                command.Parameters.AddWithValue("@email", usuario.Email);
                command.Parameters.AddWithValue("@password", usuario.Password);
                command.Parameters.AddWithValue("@username", usuario.Username);
                command.Parameters.AddWithValue("@status", usuario.Status);

                command.ExecuteNonQuery();

                return "Usuário inserido com sucesso";
             
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Duplicate entry"))
                    return "Já existe um usuario com este email.";
                return "Erro ao inserir usuario:\nConfira a mensagem: " + ex.Message;
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}
