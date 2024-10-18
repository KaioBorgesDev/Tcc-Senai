using senai_game.DTOs;
using senai_game.Models;
using senai_game.Repositories;

namespace senai_game.Services
{
    public class UsuarioService
    {

        private readonly UserRepository _repository;

        public UsuarioService(UserRepository repository)
        {
            _repository = repository;
        }
        
        public string CreateUser(UserDTO userDTO)
        {
            User user = new User(userDTO.Email, userDTO.Password, userDTO.Username);
            return _repository.InsertUser(user);       
        }

        public User Login(string email, string password)
        {
            return _repository.GetUser(email, password);
        }
    }
}
