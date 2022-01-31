using Directory.EFModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Directory.Interfaces
{
    public interface IContactsRepository : IRepository<Contacts>
    {
        Task<IReadOnlyCollection<Contacts>> GetFullDetail();
        Task<int> SetContact(Contacts c);
        Task UpdateContact(Contacts c);
    }
}
