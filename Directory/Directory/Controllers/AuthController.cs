using Directory.Interfaces;
using Directory.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Directory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region Properties
        private readonly IUsersRepository _usersRepository;
        #endregion

        #region Constructors
        public AuthController(IUsersRepository _usersRepository)
        {
            this._usersRepository = _usersRepository;
        }
        #endregion

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel login)
        {
            try
            {
                await Task.Run(() =>
                {

                });

                return Ok("");
            }
            catch (Exception)
            {
                return BadRequest("");
            }
        }
    }
}
