using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesPerguntas : ControllerBase
    {
        [HttpPost("/insertPergunta")]
        public IActionResult insertProcessos([FromBody] Pergunta pergunta)
        {
            var resposta = Pergunta.insertPerguntas(pergunta);

            if (resposta == "Processo inserido com sucesso")
            {
                return Ok(resposta);
            }
            return BadRequest(resposta);
        }
    }
}
