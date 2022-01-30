using Directory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        T GetItem(int id);
        void Update(T entity);
        void Create(T entity);

        public ReturnExceptionModel SetException(Exception exe);
    }
}
