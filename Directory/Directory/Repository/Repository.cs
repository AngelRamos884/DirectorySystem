using Directory.EFModels;
using Directory.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        #region Properties
        protected readonly DirectoryContext context;
        #endregion
        #region Constructor
        public Repository(DirectoryContext context)
        {
            this.context = context;
        }
        #endregion

        #region Methods
        protected async Task SaveAsync() => await this.context.SaveChangesAsync();

        protected void Save() => this.context.SaveChanges();

        public async Task<IEnumerable<T>> GetAll()
        {
            return await this.context.Set<T>().ToListAsync();
        }

        public T GetItem(int id)
        {
            return this.context.Set<T>().Find(id);
        }

        public void Update(T entity)
        {
            this.context.Entry(entity).State = EntityState.Modified;
            this.Save();
        }

        public void Create(T entity)
        {
            this.context.Add(entity);
            this.Save();
        }

        #endregion
    }
}
