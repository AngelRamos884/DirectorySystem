using Directory.Config;
using Directory.Interfaces;
using Directory.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Directory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region Properties
        private readonly IUsersRepository _usersRepository;
        private readonly ITokenService _tokenService;
        #endregion

        #region Constructors
        public AuthController(IUsersRepository _usersRepository, ITokenService _tokenService)
        {
            this._usersRepository = _usersRepository;
            this._tokenService = _tokenService;
        }
        #endregion

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel login)
        {

            try
            {
                var response = new TokenModel();
                var roles = new List<RoleTypeModel>();                
                var timeExp = Int32.Parse(ConfigManager.AppSetting["TokenServiceConf:timeExpHr"]);
                
                var data = await this._usersRepository.Login(login);

                roles.Add(new RoleTypeModel() { Name = data.Role });

                var token = await this._tokenService.CreateToken(data.Code, roles, timeExp);

                response = new TokenModel
                {
                    Token = token,
                    Username = data.Code,
                    DisplayName = data.Name,
                    Email = data.Email,
                    Roles = roles,
                    ExpTime = timeExp
                };

                return Ok(response);
            }
            catch (Exception exe)
            {
                var e = this._usersRepository.SetException(exe);

                return StatusCode(Int32.Parse(e.StatusCode), e.Message);
            }
        }
    }
}
