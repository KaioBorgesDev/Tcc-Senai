using MySql.Data.MySqlClient;
using senai_game.Factory;
using senai_game.Models;

namespace senai_game.Repositories
{
    public class ProcessRepository
    {
        private readonly MySqlConnection _connection;

        public ProcessRepository()
        {
            string connection_env = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);

            if (connection_env == null)
                connection_env = "senai";

            _connection = FactoryConnection.getConnection(connection_env);
        }

        internal List<Process> GetAllProcess()
        {
            var allProcessos = new List<Process>();
            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("Select * from processos", _connection);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Process processo = new Process((int)reader["id"],
                            reader["name"].ToString(),
                            reader["description"].ToString(),
                            reader["semestre"].ToString(),
                            perguntas: Question.getById((int)reader["id"])
                        );
                        allProcessos.Add(processo);
                    }
                    return allProcessos;
                }
                return allProcessos;
            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao procurar todos os processos" + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }

        internal int GetIdByProcess(Process process)
        {
            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("Select id from processos where name = @name and description = @description and semestre = @semestre", _connection);
                command.Parameters.AddWithValue("@name", process.Name);
                command.Parameters.AddWithValue("@description", process.Description);
                command.Parameters.AddWithValue("@semestre", process.Semestre);

                MySqlDataReader reader = command.ExecuteReader();
                reader.Read();
                if (reader["id"].ToString() != null)
                {
                    return (int)reader["id"];
                }
                return -1;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao pegar o id do processo" + ex.Message);
            }
            finally
            {
                _connection.Close();
            }
        }

        internal Process GetProcessById(int id)
        {
            try
            {
                _connection.Open();
                MySqlCommand command = new MySqlCommand("Select * from processos where id = @id", _connection);
                command.Parameters.AddWithValue("@id", id);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    return new Process((int)reader["id"], reader["name"].ToString(), reader["description"].ToString(), reader["semestre"].ToString(), perguntas: Question.getById((int)reader["id"]));
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao procurar processo com o id " + id + " \n" + ex.Message);
            }
        }

        internal string InsertProcess(Process process)
        {
            try
            {
                _connection.Open();

                MySqlCommand command = new MySqlCommand("insert into processos (name, description, semestre) values (@name, @description, @semestre)", _connection);
                command.Parameters.AddWithValue("@name", process.Name);
                command.Parameters.AddWithValue("@description", process.Description);
                command.Parameters.AddWithValue("@semestre", process.Semestre);

                command.ExecuteNonQuery();
                return "Processo inserido com sucesso";
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao inserir o processo..." + ex.Message);
            }finally { 
                _connection.Close();
            }
        }
    }
}
