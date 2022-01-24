using System.Collections.Generic;
using System.Threading.Tasks;
using Task4.Core.Models;

namespace Task4.Core.Services
{
    public interface IPhonebookEntryService
    {
        Task<IEnumerable<PhonebookEntry>> GetAllAsync();
        Task<PhonebookEntry> GetById(int id);
        Task<IEnumerable<PhonebookEntry>> GetRange(int count, int offset);
        Task<IEnumerable<PhonebookEntry>> FindByGroup(ContactGroup group);
        Task<PhonebookEntry> Add(PhonebookEntry item);
        Task Remove(int id);
        Task<PhonebookEntry> Update(PhonebookEntry item);
    }
}
