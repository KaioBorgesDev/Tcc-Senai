using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesUsers : ControllerBase
    {
        

        // POST: ServicesUsers/Create
        [HttpPost("/create")]
        public ActionResult Create([FromBody] Usuario usuario)
        {   
            var mg = Usuario.inserirUsuario(usuario);

            if (mg == "Usuário inserido com sucesso")
            {
                return Ok(mg);
            }

            return BadRequest(mg);
            
        }

    }
}
