using Directory.EFModels;
using Directory.Interfaces;

namespace Directory.Repository
{
    public class TelephoneNumbersRepository : Repository<TelephoneNumbers>, ITelephoneNumbersRepository
    {
        #region Constructors
        public TelephoneNumbersRepository(DirectoryContext context) : base(context)
        {
        }
        #endregion
    }
}
