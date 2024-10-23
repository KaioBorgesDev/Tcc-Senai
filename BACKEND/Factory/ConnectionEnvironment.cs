namespace senai_game.Factory
{
    public class ConnectionEnvironment
    {
        public static  string getConnectionName() {

            string connection_env = Environment.GetEnvironmentVariable("CONEXAO", EnvironmentVariableTarget.User);

            if (connection_env == null)
                connection_env = "senai";
            return connection_env;
        }
    }
}
