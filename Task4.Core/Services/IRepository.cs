using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task4.Core.Services
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetRange(int count, int offset);
        Task<IEnumerable<T>> FindAll(Func<T, bool> predicate);
        Task<T> GetById(int id);
        Task Add(T item);
        Task Remove(T item);
        Task Update(T item);
    }
}
