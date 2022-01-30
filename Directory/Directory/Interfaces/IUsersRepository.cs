using Directory.EFModels;
using Directory.Models;
using System.Threading.Tasks;

namespace Directory.Interfaces
{
    public interface IUsersRepository : IRepository<Users>
    {
        Task<Users> Login(LoginModel login);
    }
}
