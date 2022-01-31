using Directory.EFModels;
using Directory.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.Repository
{
    public class TelephoneNumbersRepository : Repository<TelephoneNumbers>, ITelephoneNumbersRepository
    {
        #region Constructors
        public TelephoneNumbersRepository(DirectoryContext context) : base(context)
        {
        }
        #endregion

        #region Methods
        public async Task SetTelephones(ICollection<TelephoneNumbers> telephoneNumbers, string createdBy, int contactId)
        {
            foreach (var item in telephoneNumbers)
            {
                item.CreatedBy = createdBy;
                item.CreatedDate = DateTime.Now;
                item.TelephoneNumber = item.TelephoneNumber;
                item.ContactId = contactId;
                await this.context.AddAsync(item);
                await this.context.SaveChangesAsync();
            }
        }

        public async Task UpdateTelephoneNumber(TelephoneNumbers t)
        {
            var oldNumber = await this.context
                                        .TelephoneNumbers
                                        .Where(x => x.Id == t.Id)
                                        .FirstOrDefaultAsync();
            if (oldNumber != null)
            {
                oldNumber.UpdatedBy = t.UpdatedBy;
                oldNumber.UpdatedDate = DateTime.Now;
                oldNumber.TelephoneNumber = t.TelephoneNumber;
                await this.context.SaveChangesAsync();
            }
        }

        public async Task UpdateTelephones(ICollection<TelephoneNumbers> telephoneNumbers, string createdBy, int id)
        {
            foreach (var item in telephoneNumbers)
            {
                var findNumber = await this.context
                                             .TelephoneNumbers
                                             .Where(x => x.TelephoneNumber == item.TelephoneNumber && x.Id != item.Id && x.ContactId == id)
                                             .FirstOrDefaultAsync();
                if(findNumber == null)
                {
                    var oldNumber = await this.context
                                                .TelephoneNumbers
                                                .Where(x => x.Id == item.Id)
                                                .FirstOrDefaultAsync();
                    if(oldNumber == null)
                    {
                        item.CreatedBy = createdBy;
                        item.CreatedDate = DateTime.Now;
                        item.TelephoneNumber = item.TelephoneNumber;
                        item.ContactId = id;
                        await this.context.AddAsync(item);
                        await this.context.SaveChangesAsync();
                    }
                }
            }
        }
        #endregion
    }
}
