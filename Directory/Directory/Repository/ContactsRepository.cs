using Directory.EFModels;
using Directory.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Directory.Repository
{
    public class ContactsRepository : Repository<Contacts>, IContactsRepository
    {
        #region Constructors
        public ContactsRepository(DirectoryContext context) : base(context)
        {
        }
        #endregion

        #region Methods
        public async Task<IReadOnlyCollection<Contacts>> GetFullDetail()
        {
            return await this.context
                               .Contacts
                               .Include(x => x.TelephoneNumbers)
                               .ToArrayAsync();
        }
        #endregion
    }
}
