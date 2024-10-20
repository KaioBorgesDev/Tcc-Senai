using Microsoft.AspNetCore.Mvc;
using senai_game.Controllers;

namespace TestProject1
{
    [TestClass]
    public class TesteControllerProcess
    {
        ControllerProcess controllerProcess;
        

        [TestInitialize]
        public void Start()
        {
            controllerProcess = new ControllerProcess();
        }
        [TestMethod]
        public void ListarProcessos_OK()
        {
            // Arrange
            var controller = new ControllerProcess();
            
            var response = controller.getAllProcess() as OkObjectResult;

            // Assert
            Assert.IsNotNull(response, "A resposta não deve ser nula.");
            Assert.IsInstanceOfType(response, typeof(OkObjectResult), "Deveria retornar Ok.");
        }

        [TestMethod]
        public void GetByIdProcessos_OK()
        {
            // Arrange
            var controller = new ControllerProcess();

            var response = controller.getProcessById(9) as OkObjectResult;

            // Assert
            Assert.IsNotNull(response, "A resposta não deve ser nula.");
            Assert.IsInstanceOfType(response, typeof(OkObjectResult), "Deveria retornar Ok.");
        }
        [TestMethod]
        public void GetByIdProcessos_BadRequest()
        {
            // Arrange
            var controller = new ControllerProcess();

            var response = controller.getProcessById(12505005) as NotFoundObjectResult;

            // Assert
            Assert.IsNotNull(response, "A resposta não deve ser nula.");
            Assert.AreEqual("Processo não encontrado", response.Value, "A mensagem deve ser 'Processo não encontrado'.");
            Assert.IsInstanceOfType(response, typeof(NotFoundObjectResult), "Deveria retornar NotFound");
        }
    }
}
