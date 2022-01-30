using Directory.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Directory
{
    public interface ITokenService
    {
        Task<string> CreateToken(string username, List<RoleTypeModel> perm, int timeExp);
    }
}
