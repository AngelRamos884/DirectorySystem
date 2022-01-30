using Directory.EFModels;
using Directory.Interfaces;

namespace Directory.Repository
{
    public class ContactsRepository : Repository<Contacts>, IContactsRepository
    {
        #region Constructors
        public ContactsRepository(DirectoryContext context) : base(context)
        {
        }
        #endregion
    }
}
