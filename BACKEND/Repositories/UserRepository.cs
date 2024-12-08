using Microsoft.AspNetCore.Identity;
using MySql.Data.MySqlClient;
using senai_game.Factory;
using senai_game.Models;

namespace senai_game.Repositories
{
    public class UserRepository
    {
        //inicinado uma conexão
        private readonly MySqlConnection _connection;
        private  MySqlConnection connection;

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

                using (MySqlCommand command = new MySqlCommand("Select password from usuarios where email = @email", _connection)) {
                    command.Parameters.AddWithValue("@email", email);
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        var password_hasher = new PasswordHasher<string>();
                        string password_user = (string)reader["password"];

                        var result = password_hasher.VerifyHashedPassword(null, password_user, password);

                        if (result == PasswordVerificationResult.Success)
                        {

                            _connection.Close();

                            connection = FactoryConnection.getConnection(ConnectionEnvironment.getConnectionName());
                            connection.Open();
                            MySqlCommand getAllFromUser = new MySqlCommand("Select * from usuarios where email = @email", connection);

                            getAllFromUser.Parameters.AddWithValue("@email", email);

                            MySqlDataReader reader_USER = getAllFromUser.ExecuteReader();
                            
                            if (reader_USER.Read())
                            {
                                var user = new User(
                               (string)reader_USER["email"],
                               null,
                               (string)reader_USER["username"],
                               (string)reader_USER["status"],
                               (string)reader_USER["rule"]
                               );
                                connection.Close();
                                return user;
                            }
                        }
                        return null;
                    }
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
                var passwordHasher = new PasswordHasher<string>();
                string password_cript = passwordHasher.HashPassword(null, usuario.Password);


                command.Parameters.AddWithValue("@email", usuario.Email);
                command.Parameters.AddWithValue("@password", password_cript);
                command.Parameters.AddWithValue("@username", usuario.Username);
                command.Parameters.AddWithValue("@status", "ativo");

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
