using Directory.Interfaces;
using Directory.Models;
using Directory.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoryController : ControllerBase
    {
        #region Properties
        private readonly IContactsRepository _contactsRepository;
        private ResponseModel response;
        #endregion

        #region Constructor
        public DirectoryController(IContactsRepository _contactsRepository)
        {
            this._contactsRepository = _contactsRepository;
        }
        #endregion

        #region Methods
        [Authorize(Roles = C.CRUD)]
        [Route("getDirectory/{param}")]
        [HttpGet]
        public async Task<IActionResult> GetSerialByTerm(string param)
        {
            try
            {
                var data = await this._contactsRepository.GetFullDetail();

                this.response = new ResponseModel()
                {
                    Message = C.OK,
                    IsSuccess = C.OK,
                    Result = data
                };
                return Ok(this.response);
            }
            catch (Exception exe)
            {
                var e = this._contactsRepository.SetException(exe);

                return StatusCode(Int32.Parse(e.StatusCode), e.Message);
            }
        }
        #endregion
    }
}
