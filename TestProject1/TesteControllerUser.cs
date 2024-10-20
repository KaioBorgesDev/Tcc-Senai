using Microsoft.AspNetCore.Mvc;
using senai_game.Controllers;
using senai_game.DTOs;

namespace TestProject1
{
    [TestClass]
    public class TesteControllerUser
    {
        
        ControllerUser controllerUser;
        UserLoginDTO userLoginDTO;

        [TestInitialize]
        public void Start()
        {
            controllerUser = new ControllerUser();
            userLoginDTO = new UserLoginDTO();
        }

        [TestMethod]
        public void TesteDeLogin_OK()
        {
            
            userLoginDTO.email = "user@example.com";
            userLoginDTO.password = "string";

            var responseAPI = controllerUser.Login(userLoginDTO);
            Assert.IsInstanceOfType(responseAPI, typeof(OkObjectResult));
        }

        [TestMethod]
        public void TesteDeLogin_Email_Errado()
        {
            //Neste teste, utilizamos um email inválido
            userLoginDTO.email = "user@ex3123121512fsac!@#$.com";
            userLoginDTO.password = "string";

            var responseAPI = controllerUser.Login(userLoginDTO);
            Assert.IsInstanceOfType(responseAPI, typeof(UnauthorizedObjectResult));
        }
            

        [TestMethod]
        public void TesteDeCriacaoUsuario_Existente()
        {
            
            var controller = new ControllerUser();
            var userDTO = new UserDTO
            {
                email = "user@example.com",
                password = "123456" 
            };

            
            var response = controller.Create(userDTO) as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(response, "A resposta não deve ser nula.");
            Assert.IsInstanceOfType(response, typeof(BadRequestObjectResult), "Deveria retornar BadRequest.");
        }
        
    }
}