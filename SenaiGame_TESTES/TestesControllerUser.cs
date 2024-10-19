using Microsoft.AspNetCore.Mvc;
using senai_game.Controllers;
using senai_game.DTOs;

public class TestesControllerUser
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
    public void TesteDeLogin()
    {

        userLoginDTO.email = "user@example.com";
        userLoginDTO.password = "string";

        var responseAPI = controllerUser.Login(userLoginDTO);
        Assert.IsInstanceOfType(responseAPI, typeof(OkResult));
    }
}
