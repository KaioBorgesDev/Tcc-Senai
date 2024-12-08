using MySql.Data.MySqlClient;
using senai_game.Factory;
using senai_game.Models;


namespace senai_game.Repositories
{
    public class ScoreRepository
    {
        private readonly MySqlConnection _connection;


        public ScoreRepository()
        {
            _connection = FactoryConnection.getConnection(ConnectionEnvironment.getConnectionName());
        }

        internal List<Score> GetAllScore()
        {
            List<Score> scores = new List<Score>();

            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("Select * from score", _connection);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    scores.Add(new Score((string)reader["email_User"], (int)reader["acertos"], (int)reader["erros"]));
                }
                return scores;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel selecionar os scores " + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }

        public string insertScoreErByEmail(string email)
        {
            try 
            {
                _connection.Open();
                int scoreUser = 0;

                MySqlCommand command = new MySqlCommand("Select erros from scores where email_user = @email", _connection);
                command.Parameters.AddWithValue("@email", email);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    scoreUser = (int)reader["erros"];
                    scoreUser++;
                    _connection.Close();
                }
                else
                {
                    return "Usuario não encontrado.";
                }

                MySqlConnection conexao_update = FactoryConnection.getConnection(ConnectionEnvironment.getConnectionName());
                conexao_update.Open();
                MySqlCommand command_update = new MySqlCommand("update scores set erros = @erro where email_user = @email", conexao_update);

                command_update.Parameters.AddWithValue("@erro", scoreUser);
                command_update.Parameters.AddWithValue("@email", email);
                command_update.ExecuteNonQuery();

                conexao_update.Close();
                return "Inserido com sucesso";
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel inserir erro " + ex.Message);
            }
        }
        internal  Score getScoreByEmail(string email)
        {
            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("Select * from scores where email_User = @email", _connection);
                command.Parameters.AddWithValue("@email", email);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    return new Score((string)reader["email_User"], (int)reader["acertos"], (int)reader["erros"]);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel pegar score do email " + ex.Message);
            }
            finally{
                _connection.Close();
            }
        }

        public string insertScoreAcByEmail(string email)
        {
            try
            {
                _connection.Open();
                int scoreUser = 0;

                MySqlCommand command = new MySqlCommand("Select acertos from scores where email_user = @email", _connection);
                command.Parameters.AddWithValue("@email", email);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    scoreUser = (int)reader["acertos"];
                    scoreUser++;
                    _connection.Close();
                }
                else
                {
                    return "Usuario não encontrado.";
                }

                MySqlConnection conexao_update = FactoryConnection.getConnection(ConnectionEnvironment.getConnectionName());
                conexao_update.Open();
                MySqlCommand command_update = new MySqlCommand("update scores set acertos = @acerto where email_user = @email", conexao_update);

                command_update.Parameters.AddWithValue("@acerto", scoreUser);
                command_update.Parameters.AddWithValue("@email", email);
                command_update.ExecuteNonQuery();

                conexao_update.Close();
                return "Inserido com sucesso";
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel inserir acertos " + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}
