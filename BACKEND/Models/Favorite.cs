namespace senai_game.Models
{
    public class Favorite
    {
        private string email_user;
        private int prova_fav;
        private string titulo_prova;


        
        public Favorite(string email_user, int prova_fav, string titulo_prova)
        {
            this.email_user = email_user;
            this.prova_fav = prova_fav;
            this.titulo_prova = titulo_prova;
        }

        public Favorite(int prova_fav, string titulo_prova)
        {
            this.titulo_prova = titulo_prova;
            this.prova_fav = prova_fav;
        }

        public string Email_user { get => email_user;  }
        public int Prova_fav { get => prova_fav; }
        public string Titulo_prova { get => titulo_prova;}

    }
}