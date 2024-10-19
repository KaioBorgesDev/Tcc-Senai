using MySql.Data.MySqlClient;
using Mysqlx.Crud;
using Mysqlx.Expr;
using senai_game.Factory;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace senai_game.Models
{
    public class Score
    {
        private string email_User;
        private int acertos;
        private int erros;

        [JsonConstructor]
        public Score(string email_User, int acertos, int erros)
        {
            this.email_User = email_User;
            this.acertos = acertos;
            this.erros = erros;
        }


        public string Email_User { get => email_User; set => email_User = value; }
        public int Acertos { get => acertos; set => acertos = value; }
        public int Erros { get => erros; set => erros = value; }
        
    }
}

