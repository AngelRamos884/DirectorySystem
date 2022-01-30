using Directory.EFModels;
using Directory.Interfaces;
using Directory.Models;
using Directory.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Directory.Repository
{
    public class UsersRepository : Repository<Users>, IUsersRepository
    {
        #region Constructors
        public UsersRepository(DirectoryContext context) : base(context)
        {
        }
        #endregion

        #region Methods
        public async Task<Users> Login(LoginModel login)
        {
            var data = await this.context
                                   .Users
                                   .Where(x => x.Password == login.Password)
                                   .FirstOrDefaultAsync();
            if(data != null)
            {
                return data;
            }
            else
            {
                throw new WebException(C.Login_Fail, C.NOT_AUTH);
            }

        }
        #endregion
    }
}
