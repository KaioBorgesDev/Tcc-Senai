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
        [HttpPost("/login")]
        public ActionResult Login([FromBody] Usuario u)
        {
            var user = Usuario.getUser(u.Email, u.Password);

            if(user != null)
                return Ok(user);

            
            return Ok("Usuario não encontrado!");

        }
    }
}
