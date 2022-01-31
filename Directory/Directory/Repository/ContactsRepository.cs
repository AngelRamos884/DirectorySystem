using Directory.EFModels;
using Directory.Interfaces;
using Directory.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public async Task<int> SetContact(Contacts c)
        {
            var checkData = this.context
                                .Contacts
                                .Where(x => (x.FirstName + " " + x.LastName).Contains(c.FirstName + " " + x.LastName))
                                .FirstOrDefault();

            if(checkData != null)
            {
                throw new WebException(C.Record_Already_Exist, C.NOTFOUND);
            }

            var contact = new Contacts()
            {
                FirstName = c.FirstName,
                LastName = c.LastName,
                CreatedBy = c.CreatedBy,
                CreatedDate = DateTime.Now
            };

            this.context.Add(contact);

            await this.context.SaveChangesAsync();

            return contact.Id;
        }

        public async Task UpdateContact(Contacts c)
        {
            var findContact = await this.context
                                          .Contacts
                                          .Where(x => (x.FirstName + " " + x.LastName).Contains(c.FirstName + " " + x.LastName) && x.Id != c.Id)
                                          .FirstOrDefaultAsync();
            if(findContact == null)
            {
                var oldContact = await this.context
                                             .Contacts
                                             .Where(x => x.Id == c.Id)
                                             .FirstOrDefaultAsync();

                oldContact.FirstName = c.FirstName;
                oldContact.LastName = c.LastName;
                oldContact.UpdatedBy = c.UpdatedBy;
                oldContact.UpdatedDate = DateTime.Now;

                await this.context.SaveChangesAsync();
            }
        }
        #endregion
    }
}
