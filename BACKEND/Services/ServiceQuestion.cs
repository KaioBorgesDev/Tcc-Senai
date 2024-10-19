using senai_game.DTOs;
using senai_game.Models;
using senai_game.Repositories;

namespace senai_game.Services
{
    public class ServiceQuestion
    {
        private readonly QuestionRepository _repository;

        public ServiceQuestion()
        {
            _repository = new QuestionRepository();
        }

        public string CreateQuestion(QuestionDTO questionDTO)
        {
            var question = new Question(questionDTO.id, questionDTO.descricao, questionDTO.id_processo, questionDTO.alternativas_list);

            return _repository.InsertQuestion(question);
        }

        
    }
}
