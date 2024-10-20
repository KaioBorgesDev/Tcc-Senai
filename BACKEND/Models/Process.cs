
namespace senai_game.Models
{
    public class Process
    {
        private int id;
        private string name;
        private string description;
        private string semestre;
        private List<Question> perguntas;


        public Process(string name, string description, string semestre)
        {
            this.name = name;
            this.description = description;
            this.semestre = semestre;
        }

        public Process(int id, string name, string description, string semestre)
        {
            this.id = id;
            this.name = name;
            this.description = description;
            this.semestre = semestre;
        }

        public Process(int id, string name, string description, string semestre, List<Question> perguntas)
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
        public List<Question> Perguntas { get => perguntas; set => perguntas = value; }

    }
}
