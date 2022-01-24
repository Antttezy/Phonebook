using System.Collections.Generic;
using System.Threading.Tasks;
using Task4.Core.Models;

namespace Task4.Core.Services
{
    public interface IGroupService
    {
        Task<IEnumerable<ContactGroup>> GetAllAsync();
        Task<ContactGroup> GetByIdAsync(int id);
        Task<ContactGroup> Add(ContactGroup item);
        Task Remove(int id);
        Task<ContactGroup> Update(ContactGroup item);
    }
}
