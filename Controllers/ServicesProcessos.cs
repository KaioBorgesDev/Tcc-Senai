using Microsoft.AspNetCore.Mvc;
using senai_game.Models;

namespace senai_game.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ServicesProcessos : ControllerBase
    {

        [HttpGet("/all")]
        public List<Processo> getAll()
        {
            return Processo.getAll();
        }
    }
}
