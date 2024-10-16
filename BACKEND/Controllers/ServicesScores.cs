using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesScores : ControllerBase
    {

        [HttpGet("")]
        public IActionResult GetAllScore()
        {
            var pontuacoes = Score.getAll();

            return Ok(pontuacoes);

        }

        [HttpPost("GetByEmail")]
        public IActionResult GetScoreByEmail([FromBody] string email)
        {
            var pontuacoes = Score.getScoreByEmail(email);
            if (pontuacoes != null)
            {
                return Ok(pontuacoes);
            }
            return Ok("Não foi encontrado score com este email.");

        }
        [HttpPost("InsertAcByEmail/{email}")]
        public IActionResult InsertScoreAcByEmail(string email)
        {
            var pontuacoes = Score.insertScoreAcByEmail(email);
            if (pontuacoes == "Usuario não encontrado.")
            {
                return BadRequest(pontuacoes);
            }
            else if(pontuacoes == "Inserido com sucesso")
            {
                return Ok(pontuacoes);
            }
            return BadRequest("Erro:" + pontuacoes);
        }
       [HttpPost("InsertErByEmail/{email}")]
        public IActionResult InsertScoreErByEmail(string email)
        {
            var pontuacoes = Score.insertScoreErByEmail(email);
            if (pontuacoes == "Usuario não encontrado.")
            {
                return BadRequest(pontuacoes);
            }
            else if (pontuacoes == "Inserido com sucesso")
            {
                return Ok(pontuacoes);
            }
            return BadRequest("Erro:" + pontuacoes);

        }
       
    }
}
