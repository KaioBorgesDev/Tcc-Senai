using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesScores : ControllerBase
    {

        [HttpGet("/Score")]
        public IActionResult GetAllScore()
        {
            var pontuacoes = Score.getAll();

            return Ok(pontuacoes);

        }

        [HttpPost("/Score/Email")]
        public IActionResult GetScoreByEmail([FromBody] string email)
        {
            var pontuacoes = Score.getScoreByEmail(email);
            if (pontuacoes != null)
            {
                return Ok(pontuacoes);
            }
            return Ok("Não foi encontrado score com este email.");

        }
    }
}
