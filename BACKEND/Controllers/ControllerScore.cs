using Microsoft.AspNetCore.Mvc;
using senai_game.Services;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ControllerScore : ControllerBase
    {
        private readonly ServiceScore _serviceScore = new ServiceScore();
        [HttpGet("")]
        public IActionResult GetAllScore()
        { 
            return Ok(_serviceScore.GetAllScore());
        }

        [HttpGet("GetByEmail/{email}")]
        public IActionResult GetScoreByEmail(string email)
       {

            var score = _serviceScore.GetScore(email);
            if (score != null)
            {
                return Ok(score);
            }
            return BadRequest("Não foi encontrado score com este email.");

        }
        [HttpPost("InsertAcByEmail/{email}")]
        public IActionResult InsertScoreAcByEmail(string email)
        {
            var score = _serviceScore.AddScoreAc(email);   

            if (score == "Inserido com sucesso")
            {
                return Ok(score);
            }
            return BadRequest("Erro:" + score);
        }
       [HttpPost("InsertErByEmail/{email}")]
        public IActionResult InsertScoreErByEmail(string email)
        {
            var score = _serviceScore.AddScoreEr(email);
            
            if (score == "Inserido com sucesso")
            {
                return Ok(score);
            }
            return BadRequest("Erro:" + score);

        }
       
    }
}
