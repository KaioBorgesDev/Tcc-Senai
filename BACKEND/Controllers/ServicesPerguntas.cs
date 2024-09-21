using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesPerguntas : ControllerBase
    {
        [HttpPost("/insertPergunta")]
        public IActionResult insertPerguntas([FromBody] Pergunta pergunta)
        {
            var resposta = Pergunta.insertPerguntas(pergunta);

            if (resposta == "Pergunta e Alternativas Inseridas com sucesso!")
            {
                return Ok(resposta);
            }
            return BadRequest(resposta);
        }
    }
}
