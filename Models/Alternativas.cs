using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Alternativas
    {
        private int id;
        private string descricao;
        private bool correta;
        private int id_pergunta;

        public Alternativas(int id, string descricao, bool correta, int id_pergunta)
        {
            this.id = id;
            this.descricao = descricao ?? throw new ArgumentNullException(nameof(descricao));
            this.correta = correta;
            this.id_pergunta = id_pergunta;
        }

        public int Id_pergunta { get => id_pergunta; set => id_pergunta = value; }
        public bool Correta { get => correta; set => correta = value; }
        public string Descricao { get => descricao; set => descricao = value; }
        public int Id { get => id; set => id = value; }

        public static List<Alternativas> getAll()
        {
            MySqlConnection conexao = null;

            var allAlternativas = new List<Alternativas>();
            try
            {
                conexao = FactoryConnection.getConnection("senai");
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Select * from alternativas", conexao);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Alternativas alternativa = new Alternativas((int)reader["id"], reader["descricao"].ToString(), (bool)reader["correta"], (int)reader["id_pergunta"]);
                        allAlternativas.Add(alternativa);
                    }
                    return allAlternativas;
                }
                else
                {
                    throw new Exception("Esta consulta não retornou nenhuma linha");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static String insert(Alternativas alternativa)
        {
            MySqlConnection conexao = null;
            try
            {
                conexao = FactoryConnection.getConnection("senai");
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Insert into alternativas (descricao, correta, id_pergunta) values (@descricao, @correta, @id_pergunta)", conexao);
                command.Parameters.AddWithValue("@descricao", alternativa.Descricao);
                command.Parameters.AddWithValue("@correta", alternativa.Correta);
                command.Parameters.AddWithValue("@id_pergunta", alternativa.Id_pergunta);
                command.ExecuteNonQuery();
                return "Alternativa inserida com sucesso";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
