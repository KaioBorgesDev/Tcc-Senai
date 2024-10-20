using Microsoft.AspNetCore.Mvc;
using senai_game.DTOs;
using senai_game.Services;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ControllerFavoritos : ControllerBase
    {
        private readonly FavoriteService _favoriteService = new FavoriteService();


        [HttpPost("insert")] 
        public ActionResult InsertFavoritos([FromBody] FavoriteDTO favoritoDTO)
        {
            
            var response = _favoriteService.CreateFavorite(favoritoDTO);

            if (response == "Inserido com sucesso" || response == "Já existe um registro com essa prova favorita.")
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }


        [HttpPost("remove")]
        public ActionResult deleteFavoritos([FromBody] FavoriteDTO favoritoDTO)
        {
            var response = _favoriteService.RemoveFavorito(favoritoDTO);

            if(response == "Removido com sucesso")
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("getAllByEmail/{email}")]
        public ActionResult getAll(string email)
        {
            var response = _favoriteService.GetAllFavorites(email);

            return Ok(response);
        }
    }
}
