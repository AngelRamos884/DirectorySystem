using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.EFModels
{
    public class DirectoryContext : DbContext
    {
        #region Properties
        public DbSet<Contacts> Contacts { get; set; }
        public DbSet<RoleType> RoleTypes { get; set; }
        public DbSet<TelephoneNumbers> TelephoneNumbers { get; set; }
        public DbSet<Users> Users { get; set; }
        #endregion

        #region Constructors
        public DirectoryContext(DbContextOptions<DirectoryContext> options) : base(options)
        {

        }
        #endregion
    }
}
