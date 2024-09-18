using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ServicesProcessos : ControllerBase
    {

        [HttpGet("/all")]
        public IActionResult getAllProcessos()
        {
            return Ok(Processo.getAll());
          
        }

        [HttpGet("/{id}")]
        public IActionResult getProcessoById(int id)
        {
            var processo = Processo.getById(id);

            if (processo == null)
            {
                return NotFound("Processo não encontrado");
            }
            return Ok(processo);
 
        }
        [HttpPost("/insert")]
        public IActionResult insertProcessos([FromBody] Processo processo)
        {
            var resposta = Processo.inserirProcessos(processo);

            if (resposta == "Processo inserido com sucesso")
            {
                return Ok(resposta);
            }
            return BadRequest(resposta);
        }
    }
}
