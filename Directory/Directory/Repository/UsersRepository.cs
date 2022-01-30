using Directory.EFModels;
using Directory.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
