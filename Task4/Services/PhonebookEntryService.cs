using System.Collections.Generic;
using System.Threading.Tasks;
using Task4.Core.Models;
using Task4.Core.Services;

namespace Task4.Services
{
    public class PhonebookEntryService : IPhonebookEntryService
    {
        private readonly IRepository<PhonebookEntry> repository;

        public PhonebookEntryService(IRepository<PhonebookEntry> repository)
        {
            this.repository = repository;
        }

        public async Task<PhonebookEntry> Add(PhonebookEntry item)
        {
            await repository.Add(item);
            return item;
        }

        public async Task<IEnumerable<PhonebookEntry>> FindByGroup(ContactGroup group)
        {
            return await repository.FindAll(ph => ph.GroupId == group.Id);
        }

        public async Task<IEnumerable<PhonebookEntry>> GetAllAsync()
        {
            return await repository.GetAllAsync();
        }

        public async Task<PhonebookEntry> GetById(int id)
        {
            return await repository.GetById(id);
        }

        public async Task<IEnumerable<PhonebookEntry>> GetRange(int count, int offset)
        {
            return await repository.GetRange(count, offset);
        }

        public async Task Remove(int id)
        {
            PhonebookEntry entry = await repository.GetById(id);
            await repository.Remove(entry);
        }

        public async Task<PhonebookEntry> Update(PhonebookEntry item)
        {
            await repository.Update(item);
            return await repository.GetById(item.Id);
        }
    }
}
