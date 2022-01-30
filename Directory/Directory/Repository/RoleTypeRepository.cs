using Directory.EFModels;
using Directory.Interfaces;

namespace Directory.Repository
{
    public class RoleTypeRepository : Repository<RoleType>, IRoleTypeRepository
    {
        #region Constructors
        public RoleTypeRepository(DirectoryContext context) : base(context)
        {
        }
        #endregion
    }
}
