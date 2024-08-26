using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Pergunta
    {
        private int id;
        private string descricao;
        private int id_processo;
        private List<Alternativas> alternativas_list;

        public Pergunta(int id, string descricao, int id_processo, List<Alternativas> alternativas_list)
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

        public static List<Pergunta> getAllById(int id)
        {
            MySqlConnection conexao = null;

            var allPerguntas = new List<Pergunta>();
            try
            {
                conexao = FactoryConnection.getConnection("senai");
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Select * from perguntas where id_processo = @id", conexao);
                command.Parameters.AddWithValue("@id", id);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Pergunta pergunta = new Pergunta((int)reader["id"], reader["descricao"].ToString(), (int)reader["id_processo"], 
                            alternativas_list: Alternativas.getAllById((int) reader["id"]));

                        allPerguntas.Add(pergunta);
                    }
                    return allPerguntas;
                }
                return allPerguntas;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Corrigir o método abaixo
        public static String insertPerguntas()
        {
            MySqlConnection conexao = null;
            try
            {
                conexao = FactoryConnection.getConnection("senai");
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Insert into perguntas (descricao, id_processo) values (@descricao, @id_processo)", conexao);
                command.Parameters.AddWithValue("@descricao", "Pergunta teste");
                command.Parameters.AddWithValue("@id_processo", 1); 

                command.ExecuteNonQuery();
                return "Pergunta inserida com sucesso";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
