using MySql.Data.MySqlClient;
using senai_game.Factory;
using senai_game.Models;

namespace senai_game.Repositories
{
    public class QuestionRepository
    {
        private readonly MySqlConnection _connection;

        public QuestionRepository()
        {
            _connection = FactoryConnection.getConnection(ConnectionEnvironment.getConnectionName());
        }
        public List<Question> getById(int id)
        {
       
            var allPerguntas = new List<Question>();
            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("Select * from perguntas where id_processo = @id", _connection);
                command.Parameters.AddWithValue("@id", id);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Question pergunta = new Question((int)reader["id"], reader["descricao"].ToString(), (int)reader["id_processo"],
                            alternativas_list: Alternativas.getById((int)reader["id"]));

                        allPerguntas.Add(pergunta);
                    }
                    _connection.Close();
                    return allPerguntas;
                }
                _connection.Close();
                return allPerguntas;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel pegar pelo id " + ex.Message);
            }
    
            finally
            {
                _connection.Close();
            }
        }
        internal string InsertQuestion(Question question)
        {
            int id_question = 0;

            try
            {
                _connection.Open(); 
                MySqlCommand command = new MySqlCommand("Insert into perguntas (descricao, id_processo) values (@descricao, @id_processo)", _connection);
                command.Parameters.AddWithValue("@descricao", question.Descricao);
                command.Parameters.AddWithValue("@id_processo", question.Id_processo);
                command.ExecuteNonQuery();


                MySqlCommand command1 = new MySqlCommand("select id from perguntas where descricao = @descricao AND id_processo = @id_processo", _connection);
                command1.Parameters.AddWithValue("@descricao", question.Descricao);
                command1.Parameters.AddWithValue("@id_processo", question.Id_processo);
                MySqlDataReader reader = command1.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    id_question = int.Parse(reader["id"].ToString());
                    foreach (Alternativas alternativa in question.Alternativas_list)
                    {
                        alternativa.Id_pergunta = id_question;
                        Alternativas.insertAlternativas(alternativa);
                    }
                }
                else
                {
                    return "Não encontramos sua pergunta depois de inserir, alternativas não foram inseridas.";
                }
                
                return "Pergunta e Alternativas Inseridas com sucesso!";
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel inserir " + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}
