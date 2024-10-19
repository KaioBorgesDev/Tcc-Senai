using MySql.Data.MySqlClient;
using senai_game.Factory;
using senai_game.Models;
using System.Data.Common;

namespace senai_game.Repositories
{
    public class ProgressRepository
    {
        private readonly MySqlConnection _connection;

        public ProgressRepository()
        {
            string connection_env = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);

            if (connection_env == null)
                connection_env = "senai";

            _connection = FactoryConnection.getConnection(connection_env);
        }

        internal List<Progress> GetAllProgress()
        {      
            List<Progress> list = new List<Progress>();

            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("Select * from progresso", _connection);
                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    list.Add(new Progress((int)reader["id_progresso"], (string)reader["email_user"], (int)reader["id_prova"], (int)reader["ultima_questao"]));
                }
                return list;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel selecionar os progressos " + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }

        internal Progress GetById(int id)
        {
            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("Select * from progresso where id_progresso = @id", _connection);
                command.Parameters.AddWithValue("@id", id);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    return new Progress((int)reader["id_progresso"], (string)reader["email_user"], (int)reader["id_prova"], (int)reader["ultima_questao"]);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel pegar progresso pelo id " + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}
