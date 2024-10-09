using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesFavoritos : ControllerBase
    {
        [HttpPost("insert")] 
        public ActionResult insertFavoritos([FromBody] Favorito favorito)
        {
            var resposta = Favorito.insertFavoritos(favorito);

            if (resposta == "Inserido com sucesso")
            {
                return Ok(resposta);
            }
            else
            {
                return BadRequest(resposta);
            }
        }


        [HttpPost("remove")]
        public ActionResult deleteFavoritos([FromBody] Favorito favorito)
        {
            var resposta = Favorito.removeFavoritos(favorito);
            if(resposta == "Removido com sucesso")
                return Ok(resposta);
            return BadRequest(resposta);
        }

        [HttpGet("getAllByEmail/{email}")]
        public ActionResult getAll(string email)
        {
            var resposta = Favorito.GetAllFavoritosByEmail(email);

            return Ok(resposta);
        }
    }
}
