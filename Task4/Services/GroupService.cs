using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task4.Core.Exceptions;
using Task4.Core.Models;
using Task4.Core.Services;

namespace Task4.Services
{
    public class GroupService : IGroupService
    {
        private readonly IRepository<ContactGroup> repository;

        public GroupService(IRepository<ContactGroup> repository)
        {
            this.repository = repository;
        }

        public async Task<ContactGroup> Add(ContactGroup item)
        {
            await repository.Add(item);
            return item;
        }

        public async Task<IEnumerable<ContactGroup>> GetAllAsync()
        {
            return await repository.GetAllAsync();
        }

        public async Task<ContactGroup> GetByIdAsync(int id)
        {
            return await repository.GetById(id);
        }

        public async Task Remove(int id)
        {
            ContactGroup entry = await repository.GetById(id);

            if (entry.Contacts.Any())
                throw new RepositoryDeleteException("Can not delete contact group while it still have contacts in it");

            await repository.Remove(entry);
        }

        public async Task<ContactGroup> Update(ContactGroup item)
        {
            await repository.Update(item);
            return await repository.GetById(item.Id);
        }
    }
}
