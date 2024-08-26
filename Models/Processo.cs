
using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class Processo
    {
        private int id;
        private string name;
        private string description;
        private string semestre;
        private List<Pergunta> perguntas;

        public Processo(int id, string name, string description, string semestre)
        {
            this.id = id;
            this.name = name ?? throw new ArgumentNullException(nameof(name));
            this.description = description ?? throw new ArgumentNullException(nameof(description));
            this.semestre = semestre ?? throw new ArgumentNullException(nameof(semestre));
        }

        public Processo(int id, string name, string description, string semestre, List<Pergunta> perguntas)
        {
            this.id = id;
            this.name = name;
            this.description = description;
            this.semestre = semestre;
            this.perguntas = perguntas;
        }

        public string Semestre { get => semestre; set => semestre = value; }
        public string Description { get => description; set => description = value; }
        public string Name { get => name; set => name = value; }
        public int Id { get => id; set => id = value; }
        public List<Pergunta> Perguntas { get => perguntas; set => perguntas = value; }

        public static List<Processo> getAll()
        {
            MySqlConnection conexao = null;

            var allProcessos = new List<Processo>();
            try
            {
                conexao = FactoryConnection.getConnection("senai");
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Select * from processos",conexao);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read()) {
                        Processo processo = new Processo((int)reader["id"],
                            reader["name"].ToString(),
                            reader["description"].ToString(),
                            reader["semestre"].ToString(),
                            perguntas: Pergunta.getAllById((int)reader["id"])
                        );
                        allProcessos.Add(processo);
                    }
                    return allProcessos;
                }
                return allProcessos;
            }catch (Exception ex)
            {
                throw ex;
            }
        }
        public static String inserirProcessos(Processo processo)
        {
            MySqlConnection conexao = null;
            try
            {
                conexao = FactoryConnection.getConnection("senai");
                conexao.Open();

                MySqlCommand command = new MySqlCommand("insert into processos (name, description, semestre) values (@name, @description, @semestre)", conexao);
                command.Parameters.AddWithValue("@name", processo.Name);
                command.Parameters.AddWithValue("@description", processo.Description);
                command.Parameters.AddWithValue("@semestre", processo.Semestre);

                command.ExecuteNonQuery();
                return "Processo inserido com sucesso";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static Processo getById(int id)
        {
            MySqlConnection conexao = null;
            try
            {
                conexao = FactoryConnection.getConnection("senai");
                conexao.Open();
                MySqlCommand command = new MySqlCommand("Select * from processos where id = @id", conexao);
                command.Parameters.AddWithValue("@id", id);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    return new Processo((int)reader["id"], reader["name"].ToString(), reader["description"].ToString(), reader["semestre"].ToString());
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
