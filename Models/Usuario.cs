using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Usuario
    {
        private string email;
        private string password;
        private string username;

        public Usuario(string email, string password, string username)
        {
            this.email = email;
            this.password = password;
            this.username = username;
        }

        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string Username { get => username; set => username = value; }

        public static Usuario getById(int id)
        {
            return new Usuario("email", "password", "username");
        }
        public static Usuario[] getAll()
        {
            return new Usuario[]
            {
                new Usuario("email1", "password1", "username1"),
                new Usuario("email2", "password2", "username2"),
                new Usuario("email3", "password3", "username3"),
                new Usuario("email4", "password4", "username4"),
                new Usuario("email5", "password5", "username5"),
            };
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
                MySqlCommand command = new MySqlCommand("insert into usuarios (email, password, username) values (@email, @password, @username)", conexao);
                command.Parameters.AddWithValue("@email", usuario.Email);
                command.Parameters.AddWithValue("@password", usuario.Password);
                command.Parameters.AddWithValue("@username", usuario.Username);

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
