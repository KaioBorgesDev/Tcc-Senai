using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesProgressos : ControllerBase
    {

        [HttpGet("/Progresso/{id}")]
        public IActionResult GetById(int id)
        {
            
            var progresso = Progresso.getById(id);

            if (progresso != null) 
                return Ok();
            return Ok("Progresso não encontrado");
        }
    }

 
}
