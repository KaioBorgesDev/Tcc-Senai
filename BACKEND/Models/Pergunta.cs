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

        public static List<Pergunta> getById(int id)
        {
            MySqlConnection conexao;
            string conexao_atual = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);

            if (conexao_atual == null)
            {
                conexao_atual = "senai";
            }

            var allPerguntas = new List<Pergunta>();
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
                        Pergunta pergunta = new Pergunta((int)reader["id"], reader["descricao"].ToString(), (int)reader["id_processo"], 
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

        
        public static String insertPerguntas(Pergunta pergunta)
        {
            MySqlConnection conexao;
            string conexao_atual = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);
            int id_pergunta = 0;

            if (conexao_atual == null)
            {
                conexao_atual = "senai";
            }
            try
            {
                conexao = FactoryConnection.getConnection(conexao_atual);
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Insert into perguntas (descricao, id_processo) values (@descricao, @id_processo)", conexao);
                command.Parameters.AddWithValue("@descricao", pergunta.descricao);
                command.Parameters.AddWithValue("@id_processo", pergunta.id_processo); 
                command.ExecuteNonQuery();


                MySqlCommand command1 = new MySqlCommand("select id from perguntas where descricao = @descricao AND id_processo = @id_processo values", conexao);
                command1.Parameters.AddWithValue("@descricao", pergunta.descricao);
                command1.Parameters.AddWithValue("@id_processo", pergunta.id_processo);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    id_pergunta = int.Parse(reader["id"].ToString());
                   conexao.Close();
                }

                conexao.Close();

                foreach(Alternativas alternativa in pergunta.alternativas_list)
                {
                    alternativa.Id_pergunta = id_pergunta;
                    Alternativas.insertAlternativas(alternativa);
                }

                return "Pergunta e Alternativas Inseridas com sucesso! ";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
