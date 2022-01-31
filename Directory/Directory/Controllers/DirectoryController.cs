using Directory.EFModels;
using Directory.Interfaces;
using Directory.Models;
using Directory.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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
        private readonly ITelephoneNumbersRepository _telephoneNumbersRepository;
        private ResponseModel response;
        private string Username = string.Empty;
        #endregion

        #region Constructor
        public DirectoryController(IContactsRepository _contactsRepository, ITelephoneNumbersRepository _telephoneNumbersRepository)
        {
            this._contactsRepository = _contactsRepository;
            this._telephoneNumbersRepository = _telephoneNumbersRepository;
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

        [Authorize(Roles = C.CRUD)]
        [Route("saveDirectory")]
        [HttpPost]
        public async Task<IActionResult> SaveDirectory(Contacts c)
        {
            try
            {
                if(c.Id > 0) 
                {
                    c.UpdatedBy = await GetUsernameFromToken("name");

                    await this._contactsRepository.UpdateContact(c);

                    await this._telephoneNumbersRepository.UpdateTelephones(c.TelephoneNumbers, c.UpdatedBy, c.Id);

                }
                else
                {
                    c.CreatedBy = await GetUsernameFromToken("name");

                    var contactId = await this._contactsRepository.SetContact(c);

                    await this._telephoneNumbersRepository.SetTelephones(c.TelephoneNumbers, c.CreatedBy, contactId);
                                        
                }

                this.response = new ResponseModel()
                {
                    Message = C.Data_Saved,
                    IsSuccess = C.OK,
                    Result = C.OK
                };

                return Ok(this.response);
            }
            catch (Exception exe)
            {
                var e = this._contactsRepository.SetException(exe);

                return StatusCode(Int32.Parse(e.StatusCode), e.Message);
            }
        }

        [Authorize(Roles = C.CRUD)]
        [Route("deleteDirectory")]
        [HttpPost]
        public IActionResult DeleteDirectory(Contacts c)
        {
            try
            {
                this._contactsRepository.Remove(c);

                this.response = new ResponseModel()
                {
                    Message = C.OK,
                    IsSuccess = C.DATA_REMOVED,
                    Result = ""
                };

                return Ok(this.response);
            }
            catch (Exception exe)
            {
                var e = this._contactsRepository.SetException(exe);

                return StatusCode(Int32.Parse(e.StatusCode), e.Message);
            }
        }

        [Authorize(Roles = C.CRUD)]
        [Route("deleteTelephoneNumber")]
        [HttpPost]
        public IActionResult DeleteTelephoneNumber(TelephoneNumbers t)
        {
            try
            {
                this._telephoneNumbersRepository.Remove(t);

                this.response = new ResponseModel()
                {
                    Message = C.DATA_REMOVED,
                    IsSuccess = C.OK,
                    Result = ""
                };

                return Ok(this.response);
            }
            catch (Exception exe)
            {
                var e = this._contactsRepository.SetException(exe);

                return StatusCode(Int32.Parse(e.StatusCode), e.Message);
            }
        }

        [Authorize(Roles = C.CRUD)]
        [Route("updateTelephoneNumber")]
        [HttpPost]
        public async Task<IActionResult> UpdateTelephoneNumber(TelephoneNumbers t)
        {
            try
            {
                t.UpdatedBy = await GetUsernameFromToken("name");

                await this._telephoneNumbersRepository.UpdateTelephoneNumber(t);

                this.response = new ResponseModel()
                {
                    Message = C.OK,
                    IsSuccess = C.DATA_REMOVED,
                    Result = ""
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

        #region Private
        private async Task<string> GetUsernameFromToken(string typeOfClaim)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");

            var token = new JwtSecurityTokenHandler().ReadJwtToken(accessToken);

            var claim = token.Claims.First(c => c.Type.Contains(typeOfClaim)).Value;

            return claim;
        }
        #endregion
    }
}
