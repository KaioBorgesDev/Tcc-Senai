using Microsoft.AspNetCore.Mvc;
using senai_game.DTOs;
using senai_game.Models;
using senai_game.Services;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ControllerQuestion : ControllerBase
    {
        
        private readonly ServiceQuestion _serviceQuestion = new ServiceQuestion();
        [HttpPost("/insertPergunta")]
        public IActionResult InsertQuestion([FromBody] QuestionDTO questionDTO)
        {
            var response = _serviceQuestion.CreateQuestion(questionDTO);

            if (response == "Pergunta e Alternativas Inseridas com sucesso!")
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
    }
}
