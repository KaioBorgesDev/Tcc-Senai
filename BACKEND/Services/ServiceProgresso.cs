using senai_game.Models;
using senai_game.Repositories;

namespace senai_game.Services
{
    public class ServiceProgress
    {
        private readonly ProgressRepository _progressRepository;


        public ServiceProgress()
        {
            _progressRepository = new ProgressRepository();
        }

        internal List<Progress> getAllProgress()
        {
            return _progressRepository.GetAllProgress();
        }

        internal Progress GetById(int id)
        {
            return _progressRepository.GetById(id);
        }
    }
}
