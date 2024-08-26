using MySql.Data.MySqlClient;

namespace senai_game.Models
{
    public class FactoryConnection
    {
        

        public static MySqlConnection getConnection(string connectionString) {
            
            MySqlConnection connection = new MySqlConnection(Configuration().GetConnectionString(connectionString));

            return connection;
        }

        private static IConfigurationRoot Configuration()
        {
            IConfigurationBuilder builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json",true,true);
                
            return builder.Build();
         
        }
    }
}
