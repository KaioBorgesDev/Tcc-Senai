using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using senai_game.DTOs;
using senai_game.Models;
using senai_game.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Text;


namespace senai_game.Services
{
    public class UsuarioService
    {
        
        private readonly UserRepository _repository;


        public UsuarioService()
        {
            _repository = new UserRepository();
        }

       
        public string GenerateToken(User user, IConfiguration _configuration)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                null,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string CreateUser(UserDTO userDTO)
        {
            User user = new User(userDTO.email, userDTO.password, userDTO.username);
            return _repository.InsertUser(user);       
        }

        public User AuthenticateUser(string email, string password)
        {
            return _repository.GetUser(email, password);
        }
    }
}
