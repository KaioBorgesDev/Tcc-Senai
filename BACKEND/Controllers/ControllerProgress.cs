using Microsoft.AspNetCore.Mvc;
using senai_game.Models;
using senai_game.Services;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ControllerProgress : ControllerBase
    {

        private readonly ServiceProgress _serviceProgress = new ServiceProgress();

        [HttpGet("/Progresso/{id}")]
        public IActionResult GetById(int id)
        {
            
            var progresso = _serviceProgress.GetById(id);

            if (progresso != null) 
                return Ok(progresso);
            return Ok("Progresso não encontrado");
        }

        [HttpGet("/Progresso")]
        public IActionResult GetAllProgresso()
        {
            var progresso = _serviceProgress.getAllProgress();

            if (progresso != null)
                return Ok(progresso);
            return Ok("Progresso não encontrado");
        }

        


    }

 
}
