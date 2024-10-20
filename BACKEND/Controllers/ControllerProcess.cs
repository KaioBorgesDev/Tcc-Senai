using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using senai_game.DTOs;
using senai_game.Services;

namespace senai_game.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ControllerProcess : ControllerBase
    {
        private readonly ServiceProcess _serviceProcess = new ServiceProcess();

        [Authorize]
        [HttpGet("/all")]
        public IActionResult getAllProcess()
        {
            
            return Ok(_serviceProcess.GetAllProcess());
        }

        [HttpGet("/{id}")]
        public IActionResult getProcessById(int id)
        {
            var process = _serviceProcess.GetProcessById(id);

            if (process == null)
            {
                return NotFound("Processo não encontrado");
            }

            return Ok(process);
 
        }
        [HttpPost("/insert")]
        public IActionResult insertProcess([FromBody] ProcessDTO processoDTO)
        {
            var response = _serviceProcess.CreateProcess(processoDTO);

            if (response == "Processo inserido com sucesso")
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPost("/getIdByProcesso")]
        public IActionResult getIdByProcess([FromBody] ProcessDTO processDTO)
        {
            var response = _serviceProcess.GetIdByProcess(processDTO);

            if (response == -1)
            {
                return BadRequest(response); 
            }
            return Ok(response);
        }
        
    }
}
