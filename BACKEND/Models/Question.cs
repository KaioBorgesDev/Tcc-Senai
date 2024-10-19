using MySql.Data.MySqlClient;
using senai_game.Factory;

namespace senai_game.Models
{
    public class Question
    {
        private int id;
        private string descricao;
        private int id_processo;
        private List<Alternativas> alternativas_list;

        public Question(int id, string descricao, int id_processo, List<Alternativas> alternativas_list)
        {
            this.id = id;
            this.descricao = descricao;
            this.id_processo = id_processo;
            this.alternativas_list = alternativas_list;
        }

        public int Id_processo { get => id_processo; set => id_processo = value; }
        public string Descricao { get => descricao; set => descricao = value; }
        public int Id { get => id; set => id = value; }
        public List<Alternativas> Alternativas_list { get => alternativas_list; set => alternativas_list = value; }

        public static List<Question> getById(int id)
        {
            MySqlConnection conexao;
            string conexao_atual = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);

            if (conexao_atual == null)
            {
                conexao_atual = "senai";
            }

            var allPerguntas = new List<Question>();
            try
            {
                conexao = FactoryConnection.getConnection(conexao_atual);
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Select * from perguntas where id_processo = @id", conexao);
                command.Parameters.AddWithValue("@id", id);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Question pergunta = new Question((int)reader["id"], reader["descricao"].ToString(), (int)reader["id_processo"], 
                            alternativas_list: Alternativas.getById((int) reader["id"]));

                        allPerguntas.Add(pergunta);
                    }
                    conexao.Close();
                    return allPerguntas;
                }
                conexao.Close();
                return allPerguntas;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
    }
}
