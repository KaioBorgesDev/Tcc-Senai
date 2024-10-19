using senai_game.DTOs;
using senai_game.Models;
using senai_game.Repositories;

namespace senai_game.Services
{
    public class ServiceProcess
    {
        private readonly ProcessRepository _repository;

        public ServiceProcess()
        {
            _repository = new ProcessRepository();
        }

        public string CreateProcess(ProcessDTO processDTO)
        {
           
            var process = new Process(processDTO.id, processDTO.name, processDTO.description, processDTO.semestre);

            return _repository.InsertProcess(process);
        }

        internal List<Process> GetAllProcess()
        {
            return _repository.GetAllProcess();
        }

        internal int GetIdByProcess(ProcessDTO processDTO)
        {
            var process = new Process(processDTO.name, processDTO.description, processDTO.semestre);
            return _repository.GetIdByProcess(process);
        }

        internal Process GetProcessById(int id)
        {
            return _repository.GetProcessById(id);
        }
    }
}
