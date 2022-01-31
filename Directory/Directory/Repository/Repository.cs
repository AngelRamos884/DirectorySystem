using Directory.EFModels;
using Directory.Interfaces;
using Directory.Models;
using Directory.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public void Remove(T entity)
        {
            this.context.Set<T>().Remove(entity);
            this.Save();
        }

        public ReturnExceptionModel SetException(Exception exe)
        {
            if (exe is SqlException)
            {
                return new ReturnExceptionModel()
                {
                    StatusCode = C.SERVERERROR.ToString(),
                    Message = C.DBError + ": " + exe.Message,
                    IsSqlDbError = true
                };
            }
            if (exe is WebException)
            {
                var e = exe as WebException;

                return new ReturnExceptionModel()
                {
                    StatusCode = e.Status.ToString(),
                    Message = e.Message,
                    IsSqlDbError = false
                };
            }
            else
            {
                return new ReturnExceptionModel()
                {
                    StatusCode = C.SERVERERROR.ToString(),
                    Message = exe.Message,
                    IsSqlDbError = false
                };
            }
        }

        #endregion
    }
}
