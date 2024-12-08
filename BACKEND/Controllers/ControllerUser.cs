
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using senai_game.DTOs;
using senai_game.Models;
using senai_game.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace senai_game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ControllerUser : ControllerBase
    {
        private readonly UsuarioService _usuarioService = new UsuarioService();

        private IConfiguration _configuration;

        public ControllerUser(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("/login")]
        public ActionResult Login([FromBody] UserLoginDTO userLoginDTO)
        {
            var user = _usuarioService.AuthenticateUser(userLoginDTO.email, userLoginDTO.password);

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (user != null)
            {
                var token = _usuarioService.GenerateToken(user, _configuration);
                return Ok(new { user, token });
            }
                
            return Unauthorized("Usuario não encontrado!");
        }



        // POST: ServicesUsers/Create
        [HttpPost("/create")]
        public ActionResult Create([FromBody] UserDTO userDTO)
            {
            var response = _usuarioService.CreateUser(userDTO);

             return Ok(response);
            
        }
    }
}
