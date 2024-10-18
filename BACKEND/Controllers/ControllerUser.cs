using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai_game.DTOs;
using senai_game.Models;
using senai_game.Services;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ControllerUser : ControllerBase
    {
        private readonly UsuarioService _usuarioService = new UsuarioService();

        // POST: ServicesUsers/Create
        [HttpPost("/create")]
        public ActionResult Create([FromBody] UserDTO userDTO)
        {
            var response = _usuarioService.CreateUser(userDTO);

            if (response == "Usuário inserido com sucesso")
            {
                return Ok(response);
            }

            return BadRequest(response);
            
        }

        [HttpPost("/login")]
        public ActionResult Login([FromBody] UserLoginDTO userLoginDTO)
        {
            var user = _usuarioService.Login(userLoginDTO.email, userLoginDTO.password);

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (user != null)
                return Ok(user);

            return Unauthorized("Usuario não encontrado!");
        }
    }
}
