using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Usuario
    {
        private string email;
        private string password;
        private string username;
        private string status;
        private string rules;

        public Usuario(string email, string password, string username, string status, string rules)
        {
            this.email = email;
            this.password = password;
            this.username = username;
            this.status = status;
            this.rules = rules;
        }

        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string Username { get => username; set => username = value; }
        public string Status { get => status; set => status = value; }
        public string Rules { get => rules; set => rules = value; }

        public static Usuario getUser(string email, string password)
        {
            MySqlConnection mySqlConnection;

            string conexao_atual = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);

            if (conexao_atual == null)
                conexao_atual = "fatec";

            mySqlConnection = FactoryConnection.getConnection(conexao_atual);

            try
            {
                mySqlConnection.Open();

                MySqlCommand command = new MySqlCommand("Select * from usuarios where email = @email and password = @password", mySqlConnection);
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    var user = new Usuario(reader["email"].ToString(), reader["password"].ToString(), reader["username"].ToString(), reader["status"].ToString(),reader["rules"].ToString());
                    return user;
                }
                return null;
            } catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
     
        public static String inserirUsuario(Usuario usuario)
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
                MySqlCommand command = new MySqlCommand("insert into usuarios (email, password, username, status) values (@email, @password, @username, @status)", conexao);
                command.Parameters.AddWithValue("@email", usuario.Email);
                command.Parameters.AddWithValue("@password", usuario.Password);
                command.Parameters.AddWithValue("@username", usuario.Username);
                command.Parameters.AddWithValue("@status", usuario.Status);
                

                command.ExecuteNonQuery();
                conexao.Close();
            }
            catch (Exception ex)
            {
                return "Erro ao inserir usuário";
            }
            return "Usuário inserido com sucesso";
        }
    }
}
