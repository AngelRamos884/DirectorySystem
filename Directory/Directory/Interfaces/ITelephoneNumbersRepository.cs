using Directory.EFModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Directory.Interfaces
{
    public interface ITelephoneNumbersRepository : IRepository<TelephoneNumbers>
    {
        Task SetTelephones(ICollection<TelephoneNumbers> telephoneNumbers, string createdBy, int contactId);
        Task UpdateTelephones(ICollection<TelephoneNumbers> telephoneNumbers, string createdBy, int id);
        Task UpdateTelephoneNumber(TelephoneNumbers t);
    }
}
