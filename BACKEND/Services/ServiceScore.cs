using senai_game.Models;
using senai_game.Repositories;

namespace senai_game.Services
{
    public class ServiceScore
    {
        private readonly ScoreRepository _scoreRepository;

        public ServiceScore() 
        { 
            _scoreRepository = new ScoreRepository();
        }

        internal string AddScoreAc(string email)
        {
            return _scoreRepository.insertScoreAcByEmail(email);
        }

        internal string AddScoreEr(string email)
        {
            return _scoreRepository.insertScoreErByEmail(email);
        }
        internal List<Score> GetAllScore()
        {
            return _scoreRepository.GetAllScore();
        }
        internal Score GetScore(string email)
        {
            return _scoreRepository.getScoreByEmail(email);
        }
    }
}
