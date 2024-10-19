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
            string connection_env = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);

            if (connection_env == null)
                connection_env = "senai";

            _connection = FactoryConnection.getConnection(connection_env);
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
        }
    }
}
